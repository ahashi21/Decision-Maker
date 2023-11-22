const knex = require('../db');
const crypto = require('crypto');

// Created a class whose properties are all methods related to the creation / viewing of polls, to keep code clean and legible
class PollHelper {

  // Creates a random string to use as admin_link and user_link
  static generateLink() {
    return crypto.randomBytes(10).toString('hex');
  }

  // Creates a new poll using creator's ID and generated links
  static async createPoll(creatorId) {
    const adminLink = this.generateRandomLink();
    const userLink = this.generateRandomLink();

    try {
      const pollId = await knex('polls').insert({ creator_id: creatorId, admin_link: adminLink, user_link: userLink });
      return pollId;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create poll!');
    }
  }

  static getPoll(pollId) {
    return knex('choices')
    .where({ poll_id: pollId });
  }

  static async organizeVotes(pollId) {
    try {
      const votes = await knex('votes')
        .where({ poll_id: pollId })
        .select('choice_id', 'ranking');

      const totalChoices = await knex('choices')
        .where({ poll_id: pollId })
        .count('id as count')
        .first();

      const organizedVotes = {};

      votes.forEach((vote) => {
        const choiceId = vote.choice_id;

        if (!organizedVotes[choiceId]) {
          organizedVotes[choiceId] = 0;
        }

        organizedVotes[choiceId] += totalChoices.count - vote.ranking + 1;
      });

      return organizedVotes;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch vote ranking!');
    }
  }

  static async getPollResults(adminLink) {
    try {
      const poll = await knex('polls').where({ admin_link: adminLink }).first();
      if (!poll) {
        throw new Error('Poll not found!');
      }

      const organizedVotes = await this.organizeVotes(poll.id);

      return {
        poll,
        results: organizedVotes,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get poll results!');
    }
  }

  // Not yet sure how best to implement voting
  // static voteOnPoll(pollId, choiceId, voterName, ranking) {
  //   return knex('votes')
  //   .insert({ poll_id: pollId, choice_id: choiceId, voter_name: voterName, ranking: ranking });
  // }
}

module.exports = PollHelper;