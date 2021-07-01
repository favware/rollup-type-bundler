#!/usr/bin/env node

import { buildCode } from '#commands/build-code';
import { cleanDist } from '#commands/clean-dist';
import { cleanExtraneousTypes } from '#commands/clean-extraneous-types';
import { cliRootDir, indent, packageCwd } from '#lib/constants';
import { logVerboseError, logVerboseInfo } from '#lib/logVerbose';
import { parseOptionsFile } from '#lib/optionsParser';
import { fileExistsAsync } from '#lib/promisified';
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

logVerboseInfo(['Checking if package.json exists in the current working directory'], options.verbose);

if (!packageJsonExistsInCwd) {
  logVerboseError({
    text: ['Could not find a file named "package.json" in the current working directory. Are you sure this is a NodeJS repository?'],
    verbose: options.verbose,
    verboseText: ['I detected this current working directory: ', process.cwd()],
    exitAfterLog: true
  });
}

logVerboseInfo(['Cleaning the configured "dist" path'], options.verbose);

/**
 * Clean the dist directory
 */
await cleanDist(options);

logVerboseInfo(['Compiling your TypeScript source code'], options.verbose);
/**
 * Calls the configured {@link Options.buildScript} to compile the TypeScript code
 */
await buildCode(options);

logVerboseInfo(['Cleaning extraneous types from the "dist" path'], options.verbose);

/**
 * Cleans extraneous types from the dist directory
 */
await cleanExtraneousTypes(options);
