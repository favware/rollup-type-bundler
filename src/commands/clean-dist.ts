import { logVerboseError } from '#lib/logVerbose';
import type { OptionValues } from 'commander';
import { rm } from 'node:fs/promises';

/**
 * Removes the `dist` directory ahead of rebuilding code to ensure a clean build
 * @param options The options that tell this function where to clean up
 */
export async function cleanDist(options: OptionValues): Promise<void> {
  try {
    await rm(options.dist, { recursive: true, force: true });
  } catch (error) {
    const typedError = error as Error;

    logVerboseError({
      text: ['Failed to clean the configured "dist" directory. Is the path accessible?'],
      verbose: options.verbose,
      verboseText: ['The error message that was thrown is: ', typedError.stack ?? typedError.message],
      logWithThrownError: true
    });
  }
}
