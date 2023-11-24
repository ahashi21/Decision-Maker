// load .env data into process.env
require('dotenv').config();

const PollHelper = require('./helpers/poll-helper.js');
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

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const pollResultsRoutes = require('./routes/poll-results');
const voteRoutes = require('./routes/vote');
const voteSubmitRoutes = require('./routes/vote-submit');
const routeHandler = require('./routes/route-handler');

app.use('/polls/:link', routeHandler);
app.use('/poll-results',pollResultsRoutes);
app.use('/vote', voteRoutes);
app.use('*', voteSubmitRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// New poll form
app.get('/polls/new', (req, res) => {
  res.render('new_poll');
});

// Poll submission
app.post('/polls', async (req, res) => {
  try {
    const { email, title, options, info } = req.body;
    const { adminLink, userLink } = await PollHelper.createPoll(email, title, options, info);
    const pollVars = { adminLink, userLink };
    sendEmail(email, 'Your poll has been created!', `Send this link to your friends: ${userLink}\nCheck the results here: ${adminLink}`);
    res.render('poll_created', pollVars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
