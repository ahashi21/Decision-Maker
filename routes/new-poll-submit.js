const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helper');
/* const mailgun = require('mailgun-js');

// Mailgun configuration
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// Send an email using Mailgun
function sendEmail(to, subject, text) {
  const data = {
    from: process.env.MAILGUN_SENDER_EMAIL,
    to,
    subject,
    text,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
}

*/

router.post('/polls', async (req, res) => {
  try {
    const { email, title, options, info } = req.body;
    const { adminLink, userLink } = await PollHelper.createPoll(email, title, options, info);
    const pollVars = { adminLink, userLink };
    //sendEmail(email, 'Your poll has been created!', `Send this link to your friends: ${userLink}\nCheck the results here: ${adminLink}`);
    res.redirect('poll_created', pollVars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;
