import { logVerboseError } from '#lib/logVerbose';
import type { OptionValues } from 'commander';
import { opendir, rm } from 'node:fs/promises';
import { basename, join, sep } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

/**
 * Scans a given {@link path} applying the {@link cb} filter
 * @param path The path to scan
 * @param cb The callback to apply to filter files in the {@link path}
 */
async function* scan(path: URL | string, cb: (path: string) => boolean): AsyncGenerator<string> {
  const dir = await opendir(typeof path === 'string' ? path : fileURLToPath(path));

  for await (const item of dir) {
    const file = join(dir.path, item.name);
    if (item.isFile()) {
      if (cb(file)) yield file;
    } else if (item.isDirectory()) {
      yield* scan(file, cb);
    }
  }
}

/**
 * Cleans up the extraneous types from the `dist` folder after bundling all the types into the root `index.d.ts`
 * @param options The options that tell this function where to clean up
 */
export async function cleanExtraneousTypes(options: OptionValues): Promise<void> {
  try {
    const regexp = /(?:\.d\.ts(?:\.map)?|\.tsbuildinfo)$/;
    const cb = (path: string) => regexp.test(path);

    for await (const path of scan(options.dist, cb)) {
      if (!path.endsWith(`${basename(fileURLToPath(options.dist))}${sep}index.d.ts`)) {
        await rm(path);
      }
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
