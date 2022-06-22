import {
  packageCwd,
  rollupTypeBundlerRcJsonPath,
  rollupTypeBundlerRcPath,
  rollupTypeBundlerRcYamlPath,
  rollupTypeBundlerRcYmlPath
} from '#lib/constants';
import { logVerboseError } from '#lib/logVerbose';
import { fileExistsAsync } from '#lib/promisified';
import { readJson, readYaml } from '#lib/utils';
import type { OptionValues } from 'commander';
import { join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Parses a YAML or JSON options file and merges that with CLI provided options
 * @param cliOptions The base CLI options to merge with the options found in a YAML or JSON file, if any
 * @returns The YAML or JSON file provided options with anything passed through the CLI overriding it. Also calls {@link transformOptionsDistPathToFileUrl}
 */
export async function parseOptionsFile(cliOptions: OptionValues) {
  const rollupTypeBundlerRcExists = await fileExistsAsync(rollupTypeBundlerRcPath);
  const rollupTypeBundlerRcJsonExists = await fileExistsAsync(rollupTypeBundlerRcJsonPath);
  const rollupTypeBundlerRcYmlExists = await fileExistsAsync(rollupTypeBundlerRcYmlPath);
  const rollupTypeBundlerRcYamlExists = await fileExistsAsync(rollupTypeBundlerRcYamlPath);

  let options = cliOptions;

  if (rollupTypeBundlerRcYamlExists || rollupTypeBundlerRcYmlExists) {
    try {
      const fileOptions = await readYaml<OptionValues>(rollupTypeBundlerRcYamlExists ? rollupTypeBundlerRcYamlPath : rollupTypeBundlerRcYmlPath);

      options = {
        ...fileOptions,
        ...options,
        external: [...(fileOptions.external ?? []), ...(options.external ?? [])]
      };
    } catch (err) {
      const typedError = err as Error;

      logVerboseError({
        text: ['Failed to read yaml config file'],
        verbose: options.verbose,
        verboseText: [
          'Attempted to read options file:',
          rollupTypeBundlerRcYamlExists ? rollupTypeBundlerRcYamlPath : rollupTypeBundlerRcYmlPath,
          '',
          'Full error: ',
          typedError.stack ?? typedError.message
        ],
        exitAfterLog: true
      });
    }
  } else if (rollupTypeBundlerRcExists || rollupTypeBundlerRcJsonExists) {
    try {
      const fileOptions = await readJson<OptionValues>(rollupTypeBundlerRcExists ? rollupTypeBundlerRcPath : rollupTypeBundlerRcJsonPath);

      options = {
        ...fileOptions,
        ...options,
        external: [...(fileOptions.external ?? []), ...(options.external ?? [])]
      };
    } catch (err) {
      const typedError = err as Error;

      logVerboseError({
        text: ['Failed to read json config file'],
        verbose: options.verbose,
        verboseText: [
          'Attempted to read options file:',
          rollupTypeBundlerRcExists ? rollupTypeBundlerRcPath : rollupTypeBundlerRcJsonPath,
          '',
          'Full error: ',
          typedError.stack ?? typedError.message
        ],
        exitAfterLog: true
      });
    }
  }

  return transformOptionsDistPathToFileUrl(options);
}

/**
 * Transforms the {@link Options} object to have a `dist` directory relative to the current working directory and as a file {@link URL}
 * Also hydrates the object with defaults in case `buildScript` and `external` were not yet set
 * @param options The options to parse
 * @returns The same options object, with the `dist` transformed and `buildScript` and `external` set.
 */
function transformOptionsDistPathToFileUrl(options: OptionValues): OptionValues {
  const distPath = Reflect.get(options, 'dist') ?? `.${sep}dist`;
  const buildScript = options.buildScript ?? 'build';
  const external = options.external ?? [];
  const verbose = options.verbose ?? false;

  return {
    ...options,
    dist: pathToFileURL(join(packageCwd, distPath)),
    buildScript,
    external,
    verbose
  };
}
