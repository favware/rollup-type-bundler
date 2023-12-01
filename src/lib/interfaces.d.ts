import type { URL } from 'node:url';
export default undefined;

declare module 'commander' {
  export interface Options {
    /**
     * The dist folder where the TypeScript types are located
     */
    dist: URL;
    /**
     * The package.json script that builds your code
     */
    buildScript?: string;
    /**
     * The file extension for your typings files. Useful if you want to set `.cts` or `.mts`. If you forego adding a prefixing dot (`.`), it will be added for you.
     * @default .ts
     */
    typingsFileExtension?: string;
    /**
     * Whether or not to show verbose output
     */
    verbose?: boolean;
    /**
     * External packages to pass to rollup as external
     */
    external?: string[];
  }
}
