// Configure process.env with .env.* files
require('./env').configureEnv();

const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = require('./apiRouter');

const PORT = parseInt(process.env.API_SERVER_PORT, 10);
const app = express();
app.use(cookieParser());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
