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

class BreakSignal {}

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

const run = () => {
  let sourceLang;
  let targetLang;
  let source;
  let target;
  let sourceKeys;
  let targetKeys;
  let key;
  let translation;

  const choices = targetLangChoices();

  selectLanguage(choices)
    .then(answers => {
      sourceLang = SOURCE_LANG.code;
      targetLang = answers.lang;
      source = readFileToJSON(filePath(sourceLang));
      target = readFileToJSON(filePath(targetLang));
      sourceKeys = Object.keys(source);
      targetKeys = Object.keys(target);

      const diff = difference(sourceKeys, targetKeys);

      if (diff.length > 0) {
        return selectKey(targetLang, diff, source, target);
      } else {
        console.log(`No translations missing from the ${targetLangName(targetLang)} translations`);
        throw new BreakSignal();
      }
    })
    .then(answers => {
      key = answers.key;
      if (key === null) {
        throw new BreakSignal();
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
      // 'y' or 'N'
      const confirmation = answers.value;

      if (confirmation === 'N') {
        console.log('Discarding new translation');
        throw new BreakSignal();
      }

      target[key] = translation;

      const sorted = sort(target);
      const data = JSON.stringify(sorted, null, 2);

      return updateTranslationsFile(data, targetLang);
    })
    .then(() => {
      run();
    })
    .catch(err => {
      if (err instanceof BreakSignal) {
        // break out of Promise chain, start from start
        run();
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
  const choices = [{ name: 'I prefer not to', value: null }, ...diff];
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
      )} for the key ${chalk.blueBright(key)}? (y/N)`,
      validate: value => value === 'y' || value === 'N',
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
