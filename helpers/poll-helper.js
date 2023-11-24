const knexConfig = require('../knexfile');
const knexEnvironment = process.env.ENV || 'development';
const knex = require('knex')(knexConfig[knexEnvironment]);
const crypto = require('crypto');

// Add query logging
knex.on('query', (queryData) => {
  console.log(queryData);
});


// Created a class whose properties are all methods related to the creation / viewing of polls, to keep code clean and legible
class PollHelper {

  // Creates a random string to use as admin_link and user_link
  static generateLink(num) {
    return crypto.randomBytes(num).toString('hex');
  }

  // Creates a new poll using creator's email and generated links
  static async createPoll(email, title, options, info) {
    try {
      const adminLink = this.generateLink(12);
      const userLink = this.generateLink(10);
      let pollId;
  
      // Log input values
      console.log('Input values:');
      console.log('email:', email);
      console.log('title:', title);
      console.log('adminLink:', adminLink);
      console.log('userLink:', userLink);
  
      return await knex.transaction(async (trx) => {
        const insertedIds = await trx('polls')
          .insert({
            creator_email: email,
            title,
            admin_link: adminLink,
            user_link: userLink,
          }, 'id');
  
        // Log insertedIds
        console.log('Inserted IDs:', insertedIds);
  
        if (!insertedIds || insertedIds.length === 0) {
          throw new Error('Failed to create poll: No inserted IDs found.');
        }
  
        pollId = insertedIds[0];
  
        // ...
      });
    } catch (error) {
      console.error('Error creating poll:', error);
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
      const poll = await knex('polls').select('id', 'title').where({ admin_link: adminLink }).first();
      if (!poll) throw new Error('Poll not found!');

      const organizedVotes = await this.organizeVotes(poll.id);

      return {
        title: poll.title,
        results: organizedVotes,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get poll results!');
    }
  }
}

module.exports = PollHelper;