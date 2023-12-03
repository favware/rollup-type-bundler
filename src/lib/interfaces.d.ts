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
    /**
     * Repeatable, each will be treated as a new entry.
     *
     * Files to be excluded from the clean step, useful if you want to process those files manually yourself later.
     *
     * This is in particular useful if you have multiple entrypoints.
     *
     * Note that a `String#endsWith` check is used to check if an entry in this array matches a path of a file to delete. So you can either use the full relative path, or just the file name.
     */
    excludeFromClean?: string[];
    /**
     * When enabled the build step will not be called. Useful if you want to only bundle types and handle building yourself.
     * @default false
     */
    noBuild?: boolean;
    /**
     * When enabled the clean step will not be called. Useful if you want to only bundle types and handle cleaning yourself.
     * @default false
     */
    noClean?: boolean;
    /**
     * A shortcut to enabling both {@link Options.noBuild} and ${@link Options.noClean}. This essentially makes it so rollup-type-bundler only deals with bundling types and nothing else.
     * @default false
     */
    onlyBundle?: boolean;
  }
}
