import { exec } from 'node:child_process';
import type { PathLike } from 'node:fs';
import { lstat } from 'node:fs/promises';
import { promisify } from 'node:util';

export const execAsync = promisify(exec);
export const fileExistsAsync = (path: PathLike) =>
  lstat(path)
    .then(() => true)
    .catch(() => false);
