const inquirer = require('inquirer');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const mandatoryVariables = [
  {
    type: 'input',
    name: 'REACT_APP_SHARETRIBE_SDK_CLIENT_ID',
    message: `What is your Flex client ID?
${chalk.dim(
      'Client ID is needed for connecting with Flex API. You can find your client ID from Flex Console.'
    )} 
`,
  },
  {
    type: 'input',
    name: 'REACT_APP_STRIPE_PUBLISHABLE_KEY',
    message: `What is your Stripe publishable key?
${chalk.dim(
      'Stripe publishable API key is for generating tokens with Stripe API. Use test key (prefix pk_test_) for development. The secret key needs to be added to Flex Console.'
    )}
`,
  },
  {
    type: 'input',
    name: 'REACT_APP_MAPBOX_ACCESS_TOKEN',
    message: `What is your Mapbox access token?
${chalk.dim(
      'Mapbox is the default map provider of the application. Sign up for Mapbox and go the to account page. Then click Create access token. For more information see the: Integrating to map providers documentation.'
    )}
`,
  },
];

const defaultVariables = [
  {
    type: 'input',
    name: 'REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY',
    message: `What is your marketplace currency?
${chalk.dim(
      'The currency used in the Marketplace must be in ISO 4217 currency code. For example USD, EUR, CAD, AUD, etc. The default value is USD.'
    )} 
`,
    default: function() {
      return 'USD';
    },
  },
  {
    type: 'input',
    name: 'REACT_APP_CANONICAL_ROOT_URL',
    message: `What is your canonical root URL? 
${chalk.dim(
      'Canonical root URL of the marketplace is needed for social media sharing and SEO optimization. When developing the template application locally URL is usually http://localhost:3000'
    )}
`,
    default: function() {
      return 'http://localhost:3000';
    },
  },
  {
    type: 'confirm',
    name: 'REACT_APP_AVAILABILITY_ENABLED',
    message: `Do you want to enable availability calendar?
${chalk.dim(
      'This setting enables the Availability Calendar for listings. The default value for this setting is true.'
    )}
`,
    default: true,
  },
  {
    type: 'confirm',
    name: 'REACT_APP_DEFAULT_SEARCHES_ENABLED',
    message: `Do you want to enable default search suggestions?
${chalk.dim(
      'This setting enables the Default Search Suggestions in location autocomplete search input. The default value for this setting is true.'
    )}
`,
    default: true,
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

// Read all lines from existing .env file to array. If line matches one of the keys in user's answers update add value to that line. Otherwise keep the original line.
const readLines = answers => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: require('fs').createReadStream('./.env'),
    });

    const data = [];
    rl.on('line', function(line) {
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

// Create new .env file using .env-template
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

    console.log(chalk.yellow.bold(`Required variables:`));

    inquirer
      .prompt(mandatoryVariables)
      .then(answers => {
        return readLines(answers);
      })
      .then(data => {
        updateEnvFile(data);

        console.log(chalk.yellow.bold(`Variables with default values:`));
        inquirer
          .prompt(defaultVariables)
          .then(answers => {
            return readLines(answers);
          })
          .then(data => {
            updateEnvFile(data);
            console.log(`
${chalk.green.bold('Environment variables saved succesfully!')} 
  
Note that the .env file is a hidden file so it might not be visible directly in directory listing. If you want to update the environment variables you need to edit the file. Remember to restart the application after editing the environment variables! 
  
Start the Flex template application by running ${chalk.cyan('yarn run dev')}
          `);
          });
      })
      .catch(err => {
        console.log(chalk.red(`An error occurred due to: ${err.message}`));
      });
  }
};

run();
