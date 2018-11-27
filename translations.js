/**
 * A translations too that can be used to keep a translation file(s)
 * up to date with one source language file.
 *
 * Possible target languages are resolved from the translation files
 * available. When adding a new tranlation file, the language name can
 * be added to the TARGET_LANG_NAMES map for clearer prompt messages.
 * By default the translations are matched agains English translations
 * but that can be changed by modifying the SOURCE_LANG.
 */

const inquirer = require('inquirer');
const difference = require('lodash/difference');
const fs = require('fs');
const chalk = require('chalk');

const PATH = './src/translations/';

const SOURCE_LANG = { name: 'English', code: 'en' };
const TARGET_LANG_NAMES = {
  es: 'Spanish',
  de: 'German',
  fr: 'French',
};

class BreakToRun {}
class BreakToRunWithTarget {}

/**
 * Resolves translation file path for a lang code: en, es, de, etc.
 */
const filePath = lang => `${PATH}${lang}.json`;

/**
 * Resolves name of a target language based on
 * a language code: en, es, de, etc.
 *
 * If a lang name is not found, language code is returned.
 */
const targetLangName = code => {
  const name = TARGET_LANG_NAMES[code];

  return name || code;
};

/**
 * Resolve a list of target language choices by finding all possible
 * translation files and filtering out the SOURCE_LANG. Provides a list
 * of objects that can be passed to inquirer.
 *
 * Relies on translation file naming: <lang code>.json
 */
const targetLangChoices = () => {
  const folder = './src/translations/';
  const filenames = fs.readdirSync(folder);

  const choices = filenames
    .filter(name => name.endsWith('.json'))
    .map(name => name.split('.')[0])
    .filter(code => code !== SOURCE_LANG.code)
    .map(code => {
      return {
        name: targetLangName(code),
        value: code,
      };
    });

  return choices;
};

/**
 * Sorts an object by key.
 *
 * Relies on an object keeping the order in which entries are added for string keys.
 * See: http://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties
 */
const sort = obj => {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach(key => (sorted[key] = obj[key]));

  return sorted;
};

/**
 * Reads a file with JSON content and returns
 * a JS object.
 *
 * @param filepath
 */
const readFileToJSON = filepath => {
  const rawdata = fs.readFileSync(filepath);
  return JSON.parse(rawdata);
};

/**
 * Run the application.
 *
 */
const run = () => {
  const choices = targetLangChoices();

  selectLanguage(choices)
    .then(answers => {
      runWithTarget(answers.lang);
    })
    .catch(err => {
      console.log(chalk.red(`An error occurred due to: ${err.message}`));
    });
};

/**
 * When a language is selected this will prompt
 * the user about adding translations to that language.
 *
 * @param {String} targetLang Target language code
 */
const runWithTarget = targetLang => {
  let key;
  let translation;

  const sourceLang = SOURCE_LANG.code;
  const source = readFileToJSON(filePath(sourceLang));
  const target = readFileToJSON(filePath(targetLang));
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);
  const diff = difference(sourceKeys, targetKeys);

  if (diff.length === 0) {
    console.log(`No translations missing from the ${targetLangName(targetLang)} translations`);
    run();
  } else {
    translateLanguage(targetLang, source, target, diff);
  }
};

/**
 * Does the actual prompting for translations.
 *
 * @param {String} targetLang Target language code
 * @param {Object} source Source translations
 * @param {Object} target Target translations
 * @param {Array} diff Missing keys in target
 */
const translateLanguage = (targetLang, source, target, diff) => {
  selectKey(targetLang, diff, source, target)
    .then(answers => {
      key = answers.key;
      if (key === null) {
        throw new BreakToRun();
      }
      if (key != null) {
        return addTranslation(targetLang, key, source);
      }
    })
    .then(answers => {
      translation = answers.value;
      return confirmTranslation(targetLang, key, translation);
    })
    .then(answers => {
      // y|Y|n|N
      const confirmation = answers.value;

      if (/n/i.test(confirmation)) {
        console.log('Discarding new translation');
        throw new BreakToRunWithTarget();
      }

      target[key] = translation;

      const sorted = sort(target);
      const data = JSON.stringify(sorted, null, 2);

      return updateTranslationsFile(data, targetLang);
    })
    .then(() => {
      runWithTarget(targetLang);
    })
    .catch(err => {
      if (err instanceof BreakToRun) {
        // break out of Promise chain, start over
        run();
      } else if (err instanceof BreakToRunWithTarget) {
        // break out of Promise chain, continue with this language
        runWithTarget(targetLang);
      } else {
        console.log(chalk.red(`An error occurred due to: ${err.message}`));
      }
    });
};

/**
 * Prompt for selecting the language of which
 * translations are inspected.
 *
 * @return a Promise
 */
const selectLanguage = choices => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'lang',
      message: 'Which language would you like to inspect? (Or hit Ctrl+C to quit)',
      choices: choices,
    },
  ]);
};

/**
 * Prompt for selecting a key that is missing from the target language translations.
 *
 * @param {String} targetLang The language that is being translated
 * @param {Array} diff Keys missing frrom target language translations
 *
 * @return a Promise
 */
const selectKey = (targetLang, diff, source, target) => {
  const choices = [{ name: 'Back to languages', value: null }, ...diff];
  return inquirer.prompt([
    {
      type: 'list',
      name: 'key',
      message: `The following translation keys (${
        diff.length
      }) are missing from the ${targetLangName(
        targetLang
      )} translations. Select a key to add a translation.`,
      choices: choices,
      pageSize: 30,
    },
  ]);
};

/**
 * Prompt for a new translation in target language.
 *
 * @param {String} targetLang The language that is being translated
 * @param {String} key Key for the new translation
 * @param {Object} source Source language translations
 *
 * @return a Promise
 */
const addTranslation = (targetLang, key, source) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: `Please provide a translation in ${targetLangName(
        targetLang
      )} for the key ${chalk.blueBright(key)}. The current ${
        SOURCE_LANG.name
      } translation is ${chalk.green(source[key])} \n`,
    },
  ]);
};

/**
 * Prompt for a confirming a new translation with 'y' or 'N'.
 *
 * @param {String} targetLang The language that is being translated
 * @param {String} key Key for the new translation
 * @param {Object} source Source language translations
 *
 * @return a Promise with with answers.value being 'y' or 'N'
 */
const confirmTranslation = (targetLang, key, translation) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: `Do you want to add the ${targetLangName(targetLang)} translation ${chalk.green(
        translation
      )} for the key ${chalk.blueBright(key)}? (y/n)`,
      validate: value => /y/i.test(value) || /n/i.test(value),
    },
  ]);
};

/**
 * Update translations file.
 *
 * @param {String} data String data to be written to file
 * @param {String} targetLang Language code of the translation file
 *
 * @return a Promise that resolves when file is written
 */
const updateTranslationsFile = (data, targetLang) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath(targetLang), data, err => {
      if (err) {
        reject(err);
      }
      console.log(chalk.bold('The translation file is updated'));
      resolve();
    });
  });
};

run();
