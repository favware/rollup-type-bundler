import type { Options } from '#lib/interfaces';
import { fileExistsAsync } from '#lib/promisified';
import { join } from 'path';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

/**
 * Bundles all the TypeScript types with {@link rollup}
 * @param options The options that tell this function where to clean up
 */
export async function bundleTypes(options: Options): Promise<void> {
  const typingsFile = join(fileURLToPath(options.dist), 'index.d.ts');

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

  await bundle.write({
    file: typingsFile,
    format: 'es'
  });
}
