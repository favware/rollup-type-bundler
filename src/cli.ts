#!/usr/bin/env node

import { buildCode } from '#commands/build-code';
import { bundleTypes } from '#commands/bundle-types';
import { cleanDist } from '#commands/clean-dist';
import { cleanExtraneousTypes } from '#commands/clean-extraneous-types';
import { cliRootDir, indent, packageCwd } from '#lib/constants';
import { logVerboseError, logVerboseInfo } from '#lib/logVerbose';
import { parseOptionsFile } from '#lib/optionsParser';
import { fileExistsAsync } from '#lib/promisified';
import { doActionAndLog } from '#lib/utils';
import { cyan } from 'colorette';
import { Command, type Options } from 'commander';
import { readFile } from 'fs/promises';
import { join } from 'node:path';
import { URL, fileURLToPath } from 'node:url';

const packageFile = new URL('package.json', cliRootDir);
const packageJson = JSON.parse(await readFile(packageFile, 'utf-8'));

const command = new Command()
  .version(packageJson.version)
  .option('-d, --dist <dist>', 'The dist directory to target')
  .option('-b, --build-script [buildScript]', 'The build script to call after cleaning your dist directory')
  .option(
    '--no-build [noBuild]',
    'When enabled (default: false) the build step will not be called. Useful if you want to only bundle types and handle building yourself.'
  )
  .option(
    '--no-clean [noClean]',
    'When enabled (default: false) the clean step will not be called. Useful if you want to only bundle types and handle cleaning yourself.'
  )
  .option(
    '--only-bundle [onlyBundle]',
    'A shortcut to enabling both `--no-build` and `--no-clean`. This essentially makes it so rollup-type-bundler only deals with bundling types and nothing else.'
  )
  .option(
    '-t, --typings-file-extension [typingsFileExtension]',
    'The input file extension for your typings files. Useful if you want to set `.cts` or `.mts`. If you forego adding a prefixing dot (`.`), it will be added for you.'
  )
  .option(
    '--output-typings-file-extension [outputTypingsFileExtension]',
    'The output file extension for your typings files. Useful if you want to set `.cts` or `.mts`. If you forego adding a prefixing dot (`.`), it will be added for you. Defaults to the value of "typingsFileExtension"'
  )
  .option('-v, --verbose', 'Print verbose information')
  .option(
    '-e, --external [external...]',
    `Repeatable, each will be treated as a new entry. Library or libraries to treat as external in Rollup (see: ${cyan(
      'https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency'
    )})`,
    (value: string, previous: string[]) => (previous ?? []).concat([value])
  )
  .option(
    '--exclude-from-clean [excludeFromClean...]',
    [
      'Repeatable, each will be treated as a new entry.',
      'Files to be excluded from the clean step, useful if you want to process those files manually yourself later.',
      'This is in particular useful if you have multiple entrypoints.',
      'Note that a String#endsWith check is used to check if an entry in this array matches a path of a file to delete. So you can either use the full relative path, or just the file name.'
    ].join('\n'),
    (value: string, previous: string[]) => (previous ?? []).concat([value])
  );

const program = command.parse(process.argv);
const options = await parseOptionsFile(program.opts<Options>());

if (options.onlyBundle === true) {
  logVerboseInfo(
    [
      'You have enabled the `--only-bundle` option. This will make it so rollup-type-bundler only deals with bundling types and nothing else. This means that the `--no-build` and `--no-clean` options are enabled by default.'
    ],
    options.verbose
  );

  options.noBuild = true;
  options.noClean = true;
}

logVerboseInfo(
  [
    'Resolved options: ',
    `${indent}dist: ${JSON.stringify(options.dist)}`,
    `${indent}buildScript: ${JSON.stringify(options.buildScript)}`,
    `${indent}typingsFileExtension: ${JSON.stringify(options.typingsFileExtension)}`,
    `${indent}outputTypingsFileExtension: ${JSON.stringify(options.outputTypingsFileExtension)}`,
    `${indent}noBuild: ${JSON.stringify(options.noBuild)}`,
    `${indent}noClean: ${JSON.stringify(options.noClean)}`,
    `${indent}onlyBundle: ${JSON.stringify(options.onlyBundle)}`,
    `${indent}verbose: ${JSON.stringify(options.verbose)}`,
    `${indent}external: ${JSON.stringify(options.external)}`,
    `${indent}excludeFromClean: ${JSON.stringify(options.excludeFromClean)}`,
    ''
  ],
  options.verbose
);

const packageJsonPath = join(packageCwd, 'package.json');

const packageJsonExistsInCwd = await doActionAndLog(
  'Checking if package.json exists in the current working directory',
  fileExistsAsync(packageJsonPath)
);

if (!packageJsonExistsInCwd) {
  logVerboseError({
    text: ['Could not find a file named "package.json" in the current working directory. Are you sure this is a NodeJS repository?'],
    verbose: options.verbose,
    verboseText: ['I detected this current working directory: ', process.cwd()],
    exitAfterLog: true
  });
}

/**
|---------------------------|
| Purges the dist directory |
|---------------------------|
*/
if (options.noClean !== true) {
  await doActionAndLog('Cleaning the configured "dist" path', cleanDist(options));
}

/**
|---------------------------------------------------------------------------------|
| Calls the configured {@link Options.buildScript} to compile the TypeScript code |
|---------------------------------------------------------------------------------|
*/
if (options.noBuild !== true) {
  await doActionAndLog('Compiling your TypeScript source code', buildCode(options));
}

/**
|-------------------------------------|
| Bundle TypeScript types with Rollup |
|-------------------------------------|
*/
await doActionAndLog('Bundling TypeScript types', bundleTypes(options));

/**
|-------------------------------------------------|
| Cleans extraneous types from the dist directory |
|-------------------------------------------------|
*/
await doActionAndLog(`Cleaning extraneous types from ${fileURLToPath(options.dist)}`, cleanExtraneousTypes(options));
