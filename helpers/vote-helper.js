const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

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