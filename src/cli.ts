#!/usr/bin/env node

import { cliRootDir, indent, packageCwd } from '#lib/constants';
import { logVerboseError, logVerboseInfo } from '#lib/logVerbose';
import { parseOptionsFile } from '#lib/optionsParser';
import { existsAsync } from '#lib/promisified';
import { cyan } from 'colorette';
import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { URL } from 'url';

const packageFile = new URL('package.json', cliRootDir);
const packageJson = JSON.parse(await readFile(packageFile, 'utf-8'));

const command = new Command()
  .version(packageJson.version)
  .argument('<dist-directory>')
  .usage(`${cyan('<dist-directory>')}`)
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

const packageJsonPath = join(packageCwd, 'package.json');
const packageJsonExistsInCwd = await existsAsync(packageJsonPath);

if (!packageJsonExistsInCwd) {
  logVerboseError({
    text: ['Could not find a file named "package.json" in the current working directory. Are you sure this is a NodeJS repository?'],
    verbose: options.verbose,
    verboseText: ['I detected this current working directory: ', process.cwd()],
    exitAfterLog: true
  });
}

logVerboseInfo([
  'Resolved options: ',
  `${indent}verbose: ${JSON.stringify(options.verbose)}`,
  `${indent}external: ${JSON.stringify(options.external)}`
]);
