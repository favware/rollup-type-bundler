import {
  packageCwd,
  rollupTypeBundlerRcJsonPath,
  rollupTypeBundlerRcPath,
  rollupTypeBundlerRcYamlPath,
  rollupTypeBundlerRcYmlPath
} from '#lib/constants';
import type { Options } from '#lib/interfaces';
import { logVerboseError } from '#lib/logVerbose';
import { fileExistsAsync } from '#lib/promisified';
import type { PathLike } from 'fs';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import { pathToFileURL } from 'url';

export async function parseOptionsFile(cliOptions: Options) {
  const rollupTypeBundlerRcExists = await fileExistsAsync(rollupTypeBundlerRcPath);
  const rollupTypeBundlerRcJsonExists = await fileExistsAsync(rollupTypeBundlerRcJsonPath);
  const rollupTypeBundlerRcYmlExists = await fileExistsAsync(rollupTypeBundlerRcYmlPath);
  const rollupTypeBundlerRcYamlExists = await fileExistsAsync(rollupTypeBundlerRcYamlPath);

  let options = cliOptions;

  if (rollupTypeBundlerRcYamlExists || rollupTypeBundlerRcYmlExists) {
    try {
      options = await readYaml(rollupTypeBundlerRcYamlExists ? rollupTypeBundlerRcYamlPath : rollupTypeBundlerRcYmlPath);
    } catch (err) {
      logVerboseError({
        text: ['Failed to read yaml config file'],
        verbose: options.verbose,
        verboseText: [
          'Attempted to read options file:',
          rollupTypeBundlerRcYamlExists ? rollupTypeBundlerRcYamlPath : rollupTypeBundlerRcYmlPath,
          '',
          'Full error: ',
          err
        ]
      });
    }
  } else if (rollupTypeBundlerRcExists || rollupTypeBundlerRcJsonExists) {
    try {
      options = await readJson(rollupTypeBundlerRcExists ? rollupTypeBundlerRcPath : rollupTypeBundlerRcJsonPath);
    } catch (err) {
      logVerboseError({
        text: ['Failed to read json config file'],
        verbose: options.verbose,
        verboseText: [
          'Attempted to read options file:',
          rollupTypeBundlerRcExists ? rollupTypeBundlerRcPath : rollupTypeBundlerRcJsonPath,
          '',
          'Full error: ',
          err
        ]
      });
    }
  }

  return transformOptionsDistPathToFileUrl(options);
}

async function readYaml<T>(pathLike: PathLike) {
  return load(await readFile(pathLike, { encoding: 'utf-8' })) as unknown as T;
}

async function readJson<T>(pathLike: PathLike) {
  return JSON.parse(await readFile(pathLike, { encoding: 'utf-8' })) as T;
}

function transformOptionsDistPathToFileUrl(options: Options): Options {
  const distPath = Reflect.get(options, 'dist');

  return {
    ...options,
    dist: pathToFileURL(join(packageCwd, distPath))
  };
}
