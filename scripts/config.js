const inquirer = require('inquirer');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const mandatoryVariables = [
  {
    type: 'input',
    name: 'REACT_APP_SHARETRIBE_SDK_CLIENT_ID',
    message: `What is your Flex client id?`,
  },
  {
    type: 'input',
    name: 'REACT_APP_STRIPE_PUBLISHABLE_KEY',
    message: `What is your Stripe publishable key?`,
  },
  {
    type: 'input',
    name: 'REACT_APP_MAPBOX_ACCESS_TOKEN',
    message: `What is your Mapbox access token?`,
  },
];


const updateEnvFile = data => {
  let content = '';
  data.map(line => {
    content = content + line.toString();
  });

  fs.writeFileSync('./.env', content);
};

const checkIfSameLine = (answers, line) => {
  let foundKey;
  if (answers) {
    Object.keys(answers).map(key => {
      if (line.includes(key)) {
        foundKey = key;
      }
    });
  }
  return foundKey;
};

const readLines = answers => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: require('fs').createReadStream('./.env')
    });
    
    const data = [];
    rl.on('line', function (line) {
      const key = checkIfSameLine(answers, line);
      if (key) {
        data.push(`${key}=${answers[key]}\n`);
      } else {
        data.push(`${line}\n`);
      }
    });
    
    rl.on('close', () => {
      resolve(data);
    });
  });
};

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

    console.log(chalk.bold('Mandatory variables'));
    inquirer
      .prompt(mandatoryVariables)
      .then(answers => {
        return readLines(answers);
      })
      .then(data => {        
        updateEnvFile(data);
      })
      .catch(err => {
        console.log(chalk.red(`An error occurred due to: ${err.message}`));
      });
  }
};

run();
