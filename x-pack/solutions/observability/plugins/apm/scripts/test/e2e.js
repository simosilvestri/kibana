/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/* eslint-disable no-console */
const path = require('path');
const yargs = require('yargs');
const childProcess = require('child_process');

const { argv } = yargs(process.argv.slice(2))
  .parserConfiguration({ 'unknown-options-as-args': true })
  .option('headed', {
    default: false,
    type: 'boolean',
    description: 'Runs Cypress in headed mode',
  })
  .help();

const e2eDir = path.join(__dirname, '../../ftr_e2e');

function runTests() {
  const mode = argv.headed ? 'open' : 'run';
  console.log(`Running e2e tests: "yarn cypress:${mode}"`);

  return childProcess.spawnSync('yarn', [`cypress:${mode}`], {
    cwd: e2eDir,
    encoding: 'utf8',
    stdio: 'inherit',
  });
}

let exitStatus = 0;
const child = runTests();
exitStatus = child.status;

process.exitCode = exitStatus;
console.log(`Quitting with exit code ${exitStatus}`);
