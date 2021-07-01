#!/usr/bin/env node

import { cleanDist } from '#commands/clean-dist';
import { cleanExtraneousTypes } from '#commands/clean-extraneous-types';
import { cliRootDir, indent, packageCwd } from '#lib/constants';
import { logVerboseError, logVerboseInfo } from '#lib/logVerbose';
import { parseOptionsFile } from '#lib/optionsParser';
import { dirExitsAsync, fileExistsAsync } from '#lib/promisified';
import { cyan } from 'colorette';
import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { URL } from 'url';

const packageFile = new URL('package.json', cliRootDir);
const packageJson = JSON.parse(await readFile(packageFile, 'utf-8'));

const command = new Command()
  .version(packageJson.version)
  .requiredOption('-d, --dist <dist>', 'The dist directory to target')
  .option('-b, --build-script [buildScript]', 'The build script to call after cleaning your dist directory', 'build')
  .option('-v, --verbose', 'Print verbose information', false)
  .option(
    '-e, --external [external...]',
    `Repeatable, each will be treated as a new entry. Library or libraries to treat as external in Rollup (see: ${cyan(
      'https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency'
    )})`,
    (value: string, previous: string[]) => previous.concat([value]),
    []
  );

const program = command.parse(process.argv);
const options = await parseOptionsFile(program.opts());

logVerboseInfo(
  [
    'Resolved options: ',
    `${indent}dist: ${JSON.stringify(options.dist)}`,
    `${indent}verbose: ${JSON.stringify(options.verbose)}`,
    `${indent}external: ${JSON.stringify(options.external)}`,
    ''
  ],
  options.verbose
);

const packageJsonPath = join(packageCwd, 'package.json');
const packageJsonExistsInCwd = await fileExistsAsync(packageJsonPath);
const distPathExistsInCwd = await dirExitsAsync(options.dist);

if (!packageJsonExistsInCwd) {
  logVerboseError({
    text: ['Could not find a file named "package.json" in the current working directory. Are you sure this is a NodeJS repository?'],
    verbose: options.verbose,
    verboseText: ['I detected this current working directory: ', process.cwd()],
    exitAfterLog: true
  });
}

if (!distPathExistsInCwd) {
  logVerboseError({
    text: ['Could not find the provided "dist" directory. Check the path you provided with "--dist" or at the "dist" key in the config file!'],
    verbose: options.verbose,
    verboseText: ['I detected this dist directory: ', JSON.stringify(options.dist)],
    exitAfterLog: true
  });
}

/**
 * Clean the dist directory
 */
cleanDist(options);

/**
 * Cleans extraneous types from the dist directory
 */
cleanExtraneousTypes(options);
