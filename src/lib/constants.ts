import { join } from 'path';
import { URL } from 'url';

/** The root directory of the CLI tool */
export const cliRootDir = new URL('../../', import.meta.url);

/** Current working directory from which the script is called */
export const packageCwd = process.cwd();

/** Path to the config file in proprietary format */
export const rollupTypeBundlerRcPath = join(packageCwd, '.rollup-type-bundlerrc');

/** Path to the config file in .json format */
export const rollupTypeBundlerRcJsonPath = `${rollupTypeBundlerRcPath}.json`;

/** Path to the config file in .yml format */
export const rollupTypeBundlerRcYmlPath = `${rollupTypeBundlerRcPath}.yml`;

/** Path to the config file in .yaml format */
export const rollupTypeBundlerRcYamlPath = `${rollupTypeBundlerRcPath}.yaml`;

/** 4 spaces indent for logging */
export const indent = ' '.repeat(4);
