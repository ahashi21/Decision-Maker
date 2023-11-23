const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helper');
const mailgun = require('mailgun-js');

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

router.post('/polls/new', async (req, res) => {
  try {
    const { email, choices } = req.body;
    const { adminLink, userLink } = await PollHelper.createPoll(email, choices);
<<<<<<< HEAD
    res.redirect(`/polls/${userLink}`); // To be replaced with mailgun integration and redirect to "success" page
=======
    sendEmail(email, 'Your poll has been created!', `Send this link to your friends: ${userLink}\nCheck the results here: ${adminLink}`);
    res.redirect('/poll_created');
>>>>>>> d53d08478877e98a440b4c0e96267c9a511ea900
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;