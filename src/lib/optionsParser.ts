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

/**
 * Parses a YAML or JSON options file and merges that with CLI provided options
 * @param cliOptions The base CLI options to merge with the options found in a YAML or JSON file, if any
 * @returns The YAML or JSON file provided options with anything passed through the CLI overriding it. Also calls {@link transformOptionsDistPathToFileUrl}
 */
export async function parseOptionsFile(cliOptions: Options) {
  const rollupTypeBundlerRcExists = await fileExistsAsync(rollupTypeBundlerRcPath);
  const rollupTypeBundlerRcJsonExists = await fileExistsAsync(rollupTypeBundlerRcJsonPath);
  const rollupTypeBundlerRcYmlExists = await fileExistsAsync(rollupTypeBundlerRcYmlPath);
  const rollupTypeBundlerRcYamlExists = await fileExistsAsync(rollupTypeBundlerRcYamlPath);

  let options = cliOptions;

  if (rollupTypeBundlerRcYamlExists || rollupTypeBundlerRcYmlExists) {
    try {
      const fileOptions = await readYaml<Options>(rollupTypeBundlerRcYamlExists ? rollupTypeBundlerRcYamlPath : rollupTypeBundlerRcYmlPath);

      options = {
        ...fileOptions,
        ...options,
        external: [...(fileOptions.external ?? []), ...(options.external ?? [])]
      };
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
      const fileOptions = await readJson<Options>(rollupTypeBundlerRcExists ? rollupTypeBundlerRcPath : rollupTypeBundlerRcJsonPath);

      options = {
        ...fileOptions,
        ...options,
        external: [...(fileOptions.external ?? []), ...(options.external ?? [])]
      };
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

/**
 * Parsed a YAML file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
async function readYaml<T>(pathLike: PathLike): Promise<T> {
  return load(await readFile(pathLike, { encoding: 'utf-8' })) as unknown as T;
}

/**
 * Parses a JSON file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
async function readJson<T>(pathLike: PathLike): Promise<T> {
  return JSON.parse(await readFile(pathLike, { encoding: 'utf-8' })) as T;
}

/**
 * Transforms the {@link Options} object to have a `dist` directory relative to the current working directory and as a file {@link URL}
 * @param options The options to parse
 * @returns The same options object, with the `dist` transformed.
 */
function transformOptionsDistPathToFileUrl(options: Options): Options {
  const distPath = Reflect.get(options, 'dist');

  return {
    ...options,
    dist: pathToFileURL(join(packageCwd, distPath))
  };
}
