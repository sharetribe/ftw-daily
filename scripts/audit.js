// Check possible npm dependency vulnerabilities
// Usage: execute "yarn run audit" in the shell
//
// You can add exceptions through .nsprc file, which is a hidden file in root folder.
//
// Note: to use this script, you should pipe in the output of 'yarn audit --json'

const bfj = require('bfj');
const fs = require('fs');
const exceptions = require('../.auditrc').exceptions;

const INDENT = '  ';
const isAuditAdvisory = o => o.type === 'auditAdvisory';

// get an advisory or empty object
const getAdvisory = o => (!o ? {} : !o.data ? {} : !o.data.advisory ? {} : o.data.advisory);
// get a resolution or empty object
const getResolution = o => (!o ? {} : !o.data ? {} : !o.data.resolution ? {} : o.data.resolution);

// Read the output of 'yarn audit --json', which should be piped in through stdin
const stdinStream = process.stdin.resume();
let advisories = {};
bfj
  .match(stdinStream, (key, value, depth) => depth === 0, { ndjson: true })
  .on('data', object => {
    if (isAuditAdvisory(object) && Array.isArray(exceptions)) {
      const { id, severity, title, url } = getAdvisory(object);
      const { path } = getResolution(object);
      const isInExceptionList = url && exceptions.includes(url);

      if (!isInExceptionList && url && path) {
        const advisory = advisories[id] ? advisories[id] : { url, severity, title };
        const paths = advisory.paths ? advisory.paths : [];
        advisories[id] = { ...advisory, paths: paths.concat(path) };
      }
    }
  })
  .on('dataError', error => {
    // A syntax error was found in the JSON
    console.error(
      `An error occurred while processing data.
      You need to pipe the results of "yarn audit --json" to this script from shell.
      Error`,
      error
    );
    process.exit(1);
  })
  .on('error', error => {
    // Some kind of operational error occurred
    console.error(
      `An error occurred while processing data.
      You need to pipe the results of "yarn audit --json" to this script from shell.
      Error`,
      error
    );
    process.exit(1);
  })
  .on('end', error => {
    const advisoryKeys = Object.keys(advisories);
    if (advisoryKeys.length > 0) {
      console.log('Vulneralibilities found:');
      console.log('\n----------------------------------------\n');

      advisoryKeys.forEach(key => {
        const { title, severity, url, paths } = advisories[key];
        console.log(key, `(${title})`);
        console.log('Severity:', severity);
        console.log('More info:', url);
        console.log('Affected dependencies:');
        paths.forEach(path => {
          console.log(INDENT, path);
        });
        console.log('\n----------------------------------------\n');
      });
      process.exit(1);
    } else {
      process.exit();
    }
  });
