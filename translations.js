/**
 * A translations too that can be used to keep a translation file(s)
 * up to date with one source language file.
 */
const inquirer = require('inquirer');
const difference = require('lodash/difference');
const fs = require('fs');
const chalk = require('chalk');

const PATH = './src/translations/';

const SOURCE_LANG = { name: 'English', value: 'en' };
const TARGET_LANGS = [
  { name: 'Spanish', value: 'es' },
  { name: 'German', value: 'de' },
  { name: 'French', value: 'fr' },
];

class BreakSignal {}

const run = () => {
  let sourceLang;
  let targetLang;
  let source;
  let target;
  let sourceKeys;
  let targetKeys;
  let key;

  selectLanguage()
    .then(answers => {
      sourceLang = SOURCE_LANG.value;
      targetLang = answers.lang;
      source = require(filePath(sourceLang));
      target = require(filePath(targetLang));
      sourceKeys = Object.keys(source);
      targetKeys = Object.keys(target);

      const diff = difference(sourceKeys, targetKeys);
      console.log(`target: ${target}`);

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
      target[key] = answers.value;

      const sorted = sort(target);
      const data = JSON.stringify(sorted, null, 2);

      fs.writeFile(filePath(targetLang), data, err => {
        if (err) {
          throw err;
        }
        console.log(chalk.bold('The translation file is updated'));
        run();
      });
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
 * Resolves translation file path for a lang code: en, es, de, etc.
 */
const filePath = lang => `${PATH}${lang}.json`;

/**
 * Resolves name of a target language based on
 * a language code: en, es, de, etc.
 */
const targetLangName = lang => {
  const targetLang = TARGET_LANGS.filter(l => l.value === lang)[0];
  return targetLang.name;
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
 * Prompt for selecting the language of which
 * translations are inspected.
 *
 * @return a Promise
 */
const selectLanguage = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'lang',
      message: 'Which language would you like to inspect? (Or hit Ctrl+C to quit)',
      choices: TARGET_LANGS,
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
      message: `The following translation keys are missing from the ${targetLangName(
        targetLang
      )} translations. Select a key to add a translation.`,
      choices: choices,
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
      )} for the key ${chalk.blueBright(key)}. The current ${SOURCE_LANG.name} translation is ${chalk.green(source[key])}`,
    },
  ]);
};

run();
