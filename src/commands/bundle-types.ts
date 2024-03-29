import { fileExistsAsync } from '#lib/promisified';
import { getOutputTypingsInputFileName, getTypingsInputFileName } from '#lib/utils';
import type { Options } from 'commander';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

const sleep = promisify(setTimeout);

/**
 * Bundles all the TypeScript types with {@link rollup}
 * @param options The options that tell this function where to clean up
 */
export async function bundleTypes(options: Options): Promise<void> {
  const typingsFile = join(fileURLToPath(options.dist), getTypingsInputFileName(options));

  // Sleep repeated 1 second until the `index.d.ts` file exists
  do {
    await sleep(1000);
  } while (!(await fileExistsAsync(typingsFile)));

  const bundle = await rollup({
    input: typingsFile,
    external: options.external,
    plugins: [dts()],
    cache: false
  });

  const outputTypingsFile = join(fileURLToPath(options.dist), getOutputTypingsInputFileName(options));

  await bundle.write({
    file: outputTypingsFile,
    format: 'es'
  });
}
