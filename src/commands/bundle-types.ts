import type { Options } from '#lib/interfaces';
import { rollup } from 'rollup';
import { fileURLToPath, URL } from 'url';
import dts from 'rollup-plugin-dts';

/**
 * Bundles all the TypeScript types with {@link rollup}
 * @param options The options that tell this function where to clean up
 */
export async function bundleTypes(options: Options): Promise<void> {
  const typingsFile = fileURLToPath(new URL('index.d.ts', options.dist));

  await rollup({
    input: typingsFile,

    output: {
      file: typingsFile,
      format: 'es'
    },
    external: options.external,
    plugins: [dts()]
  });
}
