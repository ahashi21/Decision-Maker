const knex = require('../db');
const crypto = require('crypto');

// Created a class whose properties are all methods related to the creation / viewing of polls, to keep code clean and legible
class PollHelper {
  static generateLink() {
    return crypto.randomBytes(10).toString('hex');
  }

  static async createPoll(creatorId) {
    const adminLink = this.generateRandomLink();
    const userLink = this.generateRandomLink();

    try {
      const pollId = await knex('polls').insert({ creator_id: creatorId, admin_link: adminLink, user_link: userLink });
      return pollId;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create poll');
    }
  }

  static getAllPolls() {
    return knex('polls')
    .select('*');
  }

  static getChoicesByPollId(pollId) {
    return knex('choices')
    .where({ poll_id: pollId });
  }

  static voteOnPoll(pollId, choiceId, voterName, ranking) {
    return knex('votes')
    .insert({ poll_id: pollId, choice_id: choiceId, voter_name: voterName, ranking: ranking });
  }
}

module.exports = PollHelper;