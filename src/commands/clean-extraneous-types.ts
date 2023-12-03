import { logVerboseError } from '#lib/logVerbose';
import { findFilesRecursivelyRegex } from '@sapphire/node-utilities';
import type { Options } from 'commander';
import { rm } from 'node:fs/promises';
import { basename, sep } from 'node:path';
import { getTypingsInputFileName } from '#lib/utils';
import { fileURLToPath } from 'node:url';

/**
 * Cleans up the extraneous types from the `dist` folder after bundling all the types into the root `index.d.[cm]?ts`
 * @param options The options that tell this function where to clean up
 */
export async function cleanExtraneousTypes(options: Options): Promise<void> {
  try {
    const regexp = /(?:\.d\.[cm]?ts(?:\.map)?|\.tsbuildinfo)$/;

    const inputFileName = `${basename(fileURLToPath(options.dist))}${sep}${getTypingsInputFileName(options)}`;

    for await (const path of findFilesRecursivelyRegex(options.dist, regexp)) {
      if (path.endsWith(inputFileName) || options.excludeFromClean?.some((filePath) => path.endsWith(filePath))) {
        continue;
      }

      await rm(path);
    }
  } catch (err) {
    const typedError = err as Error;

    logVerboseError({
      text: ['An error occurred while removing one or more of the extraneous types from the `dist` directory.', 'Please remove them manually'],
      verbose: options.verbose,
      verboseText: [
        'I was scanning this dist path: ',
        options.dist.toString(),
        'Furthermore, the exact error that occurred is: ',
        typedError.stack ?? typedError.message
      ],
      logWithThrownError: true
    });
  }
}
