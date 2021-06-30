import { exec } from 'child_process';
import type { PathLike } from 'fs';
import { lstat, readdir } from 'fs/promises';
import { promisify } from 'util';

export const execAsync = promisify(exec);
export const fileExistsAsync = (path: PathLike) =>
  lstat(path)
    .then(() => true)
    .catch(() => false);

export const dirExitsAsync = (path: PathLike) =>
  readdir(path)
    .then(() => true)
    .catch(() => false);
