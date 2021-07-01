import { indent, packageCwd } from '#lib/constants';
import type { Options } from '#lib/interfaces';
import { logVerboseError } from '#lib/logVerbose';
import { execAsync } from '#lib/promisified';

export async function buildCode(options: Options): Promise<void> {
  try {
    await execAsync(options.buildScript ? `npm run ${options.buildScript} --prefix ${packageCwd}` : `npm run build --prefix ${packageCwd}`);
  } catch (err) {
    logVerboseError({
      text: [
        'An error occurred while building the TypeScript code',
        `${indent}If you provided a custom build script with "-b" or "--build-script", or through "buildScript" in a config file, then make that script actually exists in your "package.json"`,
        `${indent}If you did not provide this option, then make sure there is a script called "build" in your "package.json"`
      ],
      verbose: options.verbose,
      verboseText: [
        options.buildScript ? `The build script I received is: ${options.buildScript}` : undefined,
        'Furthermore, the exact error that occurred is: ',
        err
      ].filter(Boolean)
    });
  }
}
