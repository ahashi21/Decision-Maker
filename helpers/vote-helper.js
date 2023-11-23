const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);

class VoteHelper {
  static async submitVote(pollId, voterName, choices) {
   
    const result = await knex('votes').insert({
      poll_id: pollId,
      voter_name: voterName,
      choices: JSON.stringify(choices)
    });

    return result;
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