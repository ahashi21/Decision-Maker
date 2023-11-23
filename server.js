// load .env data into process.env
require('dotenv').config();

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
const newPollSubmitRoutes = require('./routes/new-poll-submit');
const newPollDisplayRoutes = require('./routes/new-poll-display');
const pollResultsRoutes = require('./routes/poll-results');
const voteRoutes = require('./routes/vote');
const voteSubmitRoutes = require('./routes/vote-submit');
const routeHandler = require('./routes/route-handler');

app.use(newPollSubmitRoutes);
app.use(newPollDisplayRoutes);
app.use('/poll-results',pollResultsRoutes);
app.use('/vote', voteRoutes);
app.use(voteSubmitRoutes);
app.use('/', routeHandler);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});