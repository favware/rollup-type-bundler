import { indent, packageCwd } from '#lib/constants';
import type { Options } from '#lib/interfaces';
import { logVerboseError } from '#lib/logVerbose';
import { execAsync } from '#lib/promisified';

/**
 * Calls the configured `buildScript`, or "build" if none, to compile the TypeScript code
 * @param options The options that tell this function where to clean up
 */
export async function buildCode(options: Options): Promise<void> {
  try {
    await execAsync(options.buildScript ? `npm run ${options.buildScript}` : `npm run build`, {
      cwd: packageCwd,
      env: {
        ...process.env,
        NODE_ENV: 'development'
      }
    });
  } catch (err) {
    const typedError = err as Error;
    logVerboseError({
      text: [
        'An error occurred while building the TypeScript code',
        `${indent}If you provided a custom build script with "-b" or "--build-script", or through "buildScript" in a config file, then make that script actually exists in your "package.json".`,
        `${indent}If you did not provide this option, then make sure there is a script called "build" in your "package.json".`
      ],
      verbose: options.verbose,
      verboseText: [
        options.buildScript ? `The build script I received is: ${options.buildScript}` : undefined,
        'Furthermore, the exact error that occurred is: ',
        typedError.stack ?? typedError.message
      ].filter(Boolean),
      logWithThrownError: true
    });
  }
}
