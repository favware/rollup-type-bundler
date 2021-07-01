import type { Options } from '#lib/interfaces';
import { fileExistsAsync } from '#lib/promisified';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';
import { fileURLToPath, URL } from 'url';
import { setTimeout as sleep } from 'timers/promises';

/**
 * Bundles all the TypeScript types with {@link rollup}
 * @param options The options that tell this function where to clean up
 */
export async function bundleTypes(options: Options): Promise<void> {
  const typingsFile = fileURLToPath(new URL('index.d.ts', options.dist));

  // Sleep repeated 1 second until the `index.d.ts` file exists
  do {
    await sleep(1000);
  } while (!(await fileExistsAsync(typingsFile)));

  await rollup({
    input: typingsFile,

    output: {
      file: typingsFile,
      format: 'es'
    },
    external: options.external,
    plugins: [dts()],
    cache: false
  });
}
