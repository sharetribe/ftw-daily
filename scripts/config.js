const fs = require('fs');
const chalk = require('chalk');



const createEnvFile = () => {
  fs.copyFileSync('./.env-template', './.env', err => {
    if (err) throw err;
  });
};

const run = () => {
if (fs.existsSync(`./.env`)) {
    console.log(
      `.env file already exists. You can edit the variables directly in that file. Remember to restart the application after editing the environment variables!`
    );
  } else {
    console.log(
      `You don't have .env file yet. With this tool you can configure required enviroment variables and create .env file automatically.`
    );

    createEnvFile();

  }
};

run();
