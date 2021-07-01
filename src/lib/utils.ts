import type { PathLike } from 'fs';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';

/**
 * Parsed a YAML file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
export async function readYaml<T>(pathLike: PathLike): Promise<T> {
  return load(await readFile(pathLike, { encoding: 'utf-8' })) as unknown as T;
}

/**
 * Parses a JSON file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
export async function readJson<T>(pathLike: PathLike): Promise<T> {
  return JSON.parse(await readFile(pathLike, { encoding: 'utf-8' })) as T;
}
