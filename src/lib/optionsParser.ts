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
import { readJson, readYaml } from '#lib/utils';
import { join, sep } from 'path';
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
        ],
        exitAfterLog: true
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
        ],
        exitAfterLog: true
      });
    }
  }

  return transformOptionsDistPathToFileUrl(options);
}

/**
 * Transforms the {@link Options} object to have a `dist` directory relative to the current working directory and as a file {@link URL}
 * @param options The options to parse
 * @returns The same options object, with the `dist` transformed.
 */
function transformOptionsDistPathToFileUrl(options: Options): Options {
  const distPath = Reflect.get(options, 'dist') ?? `.${sep}dist`;

  return {
    ...options,
    dist: pathToFileURL(join(packageCwd, distPath))
  };
}
