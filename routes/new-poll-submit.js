const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helper');
const mailgun = require('mailgun-js');

// Mailgun configuration
const mg = mailgun({
  apiKey: '49e18c89f7fd32422d9adc3334aaeeaa-5d2b1caa-82b398c5',
  domain: 'sandbox87dba3e3ffa04898897c8a0868b7285b.mailgun.org'
});

// Send an email using Mailgun
function sendEmail(to, subject, text) {
  const data = {
    from: 'decision-maker@sandbox87dba3e3ffa04898897c8a0868b7285b.mailgun.org',
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

router.post('/polls', async (req, res) => {
  try {
    const { email, choices } = req.body;
    const { adminLink, userLink } = await PollHelper.createPoll(email, choices);
    sendEmail(email, 'Your poll has been created!', `Send this link to your friends: ${userLink}\nCheck the results here: ${adminLink}`);
    res.redirect('/'); // To be replaced with redirection to "success" page
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;