import { rm } from 'fs/promises';
import type { Options } from '#lib/interfaces';

/**
 * Removes the `dist` directory ahead of rebuilding code to ensure a clean build
 * @param options The options that tell this function where to clean up
 */
export async function cleanDist(options: Options): Promise<void> {
  await rm(options.dist, { recursive: true, force: true });
}
