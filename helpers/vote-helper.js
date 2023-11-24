const knexConfig = require('../knexfile');
const knexEnvironment = process.env.ENV || 'development';
const knex = require('knex')(knexConfig[knexEnvironment]);

// Class containing a few methods to assist with submitting votes and retrieving poll.id
class VoteHelper {
  static async submitVote(pollId, voterName) {
   
    const votePromises = choices.map(async (choice) => {
      return knex('votes').insert({
        poll_id: pollId,
        choice_id: choice.choice_id,
        rank: choice.rank
      });
    });
    await Promise.all(votePromises);
  }

  static async getPollId(link, linkType) {
    const column = linkType === 'user' ? 'user_link' : 'admin_link';

    const result = await knex('polls')
      .select('id')
      .where(column, link)
      .first();

    return result ? result.id : null;
  }
}

module.exports = VoteHelper;