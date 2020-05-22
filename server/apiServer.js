// Configure process.env with .env.* files
require('./env').configureEnv();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const apiRouter = require('./apiRouter');

const PORT = parseInt(process.env.API_SERVER_PORT, 10);
const app = express();

// NOTE: CORS is only needed in this dev API server because it's
// running in a different port than the main app.
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Development API server listening on ${PORT}`);
});
