// NOTE: this server is purely a dev-mode server. In production, the
// server/index.js server also serves the API routes.

// Configure process.env with .env.* files
require('./env').configureEnv();

const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = require('./apiRouter');

const radix = 10;
const PORT = parseInt(process.env.DEV_API_SERVER_PORT, radix);
const app = express();
app.use(cookieParser());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
