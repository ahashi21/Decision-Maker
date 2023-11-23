const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const crypto = require('crypto');

// Created a class whose properties are all methods related to the creation / viewing of polls, to keep code clean and legible
class PollHelper {

  // Creates a random string to use as admin_link and user_link
  static generateLink(num) {
    return crypto.randomBytes(num).toString('hex');
  }

  // Creates a new poll using creator's email and generated links
  static async createPoll(email, choices) {
    try {

      const adminLink = this.generateRandomLink(12);
      const userLink = this.generateRandomLink(10);

      return await knex.transaction(async (trx) => {

        const [userId] = await trx('users')
          .insert({ email: email }, 'id');

        const [pollId] = await trx('polls')
          .insert({
            creator_id: userId,
            admin_link: adminLink,
            user_link: userLink,
          }, 'id');

        const choicesData = choices.map((choice) => ({
          poll_id: pollId,
          title: choice.title,
          description: choice.description,
        }));

        await trx('choices').insert(choicesData);

        await trx.commit();

        return { adminLink, userLink };
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create poll!');
    }
  }


  static getPoll(userLink) {
    return knex('choices')
      .where({ user_link: userLink });
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
      const poll = await knex('polls')
        .where({ admin_link: adminLink }).first();
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
}

module.exports = PollHelper;