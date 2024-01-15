<div align="center">

# rollup-type-bundler

**A small CLI tool to bundle types with rollup**

[![GitHub](https://img.shields.io/github/license/favware/rollup-type-bundler)](https://github.com/favware/rollup-type-bundler/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@favware/rollup-type-bundler?color=crimson&logo=npm)](https://www.npmjs.com/package/@favware/rollup-type-bundler)

[![Support Server](https://discord.com/api/guilds/512303595966824458/embed.png?style=banner2)](https://join.favware.tech)

</div>

## Description

When you create a library in TypeScript, you will often be able to just publish
it with your current toolset; however, once your library grows and grows, you
might want to make it possible for people of your library to use [TypeScript
Module Augmentation][tma] to merge additional types into the types that you
provide.

Unfortunately, this introduces a big issue in TypeScript. Even when re-exporting
all your interfaces/types/classes in a root `index.d.ts` that you are
referencing in `"types"` in your `package.json`, TypeScript still won't properly
apply folder-nested module augmentation (i.e. a type that's in
`your-package/dist/lib/structures/SomeClass.d.ts`) when augmenting like this:

```ts
declare module 'your-package' {}
```

Without this package, your users would have to augment the type like this:

```ts
declare module 'your-package/dist/lib/structures/SomeClass' {}
```

As you might guess, this is extremely bad developer experience because you
cannot apply all module augmentations in 1 block. That's where this rollup
module comes in - now, you can bundle types in a developer-friendly way and make
life easier for everyone involved.

[tma]: https://www.typescriptlang.org/docs/handbook/declaration-merging.html

### How this works

The library uses [rollup] with [rollup-plugin-dts] under the hood. It will
execute a few steps:

1. It cleans the configured distribution directory (`--dist` flag or `dist` in
   config).
   - This can be skipped by configuring `--no-clean`
2. It calls the `--build-script` (or `buildScript` in config) to build your code
   with your compiler. This defaults to `build`.
   - This can be skipped by configuring `--no-build`
3. It executes [rollup] to bundle your types into 1 `index.d.ts` (extension can
   be customized through `--output-typings-file-extension`) file, output to the
   configured `dist` directory.
4. It removes all other `.d.ts` and `.d.ts.map` files from your configured
   `dist` directory as they are now superfluous. (This can be skipped by
   providing `--no-clean`, or alternatively files can be excluded from the clean
   step by providing `--exclude-from-clean`).

> Note: You can combine `--no-clean` and `--no-build` by using `--only-bundle`.

[rollup]: https://www.npmjs.com/package/rollup
[rollup-plugin-dts]: https://www.npmjs.com/package/rollup-plugin-dts

## Installation

You can use the following command to install this package, or replace
`npm install -D` with your package manager of choice.

```sh
npm install -D @favware/rollup-type-bundler
```

Or install it globally:

```sh
npm install -g @favware/rollup-type-bundler
```

Then call the script with `rollup-type-bundler` or `rtb`:

```sh
rollup-type-bundler --dist ./dist # Add any other flags or use --help
rtb --dist ./dist # Add any other flags or use --help
```

Alternatively you can call the CLI directly with `npx`:

```sh
npx @favware/rollup-type-bundler --dist ./dist # Add any other flags or use --help
```

## Usage

You can provide all options through CLI flags:

```sh
Usage: rollup-type-bundler [options]

Options:
  -V, --version                                                      output the version number
  -d, --dist <dist>                                                  The dist directory to target
  -b, --build-script [buildScript]                                   The build script to call after cleaning your dist directory
  -nb, --no-build [noBuild]                                          When enabled (default: false) the build step will not be called. Useful if you want to only bundle types and
                                                                     handle building yourself.
  -nc, --no-clean [noClean]                                          When enabled (default: false) the clean step will not be called. Useful if you want to only bundle types and
                                                                     handle cleaning yourself.
  -ob, --only-bundle [onlyBundle]                                    A shortcut to enabling both `--no-build` and `--no-clean`. This essentially makes it so rollup-type-bundler
                                                                     only deals with bundling types and nothing else.
  -t, --typings-file-extension [typingsFileExtension]                The input file extension for your typings files. Useful if you want to set `.cts` or `.mts`. If you forego
                                                                     adding a prefixing dot (`.`), it will be added for you.
  -ot, --output-typings-file-extension [outputTypingsFileExtension]  The output file extension for your typings files. Useful if you want to set `.cts` or `.mts`. If you forego
                                                                     adding a prefixing dot (`.`), it will be added for you. Defaults to the value of "typingsFileExtension"
  -v, --verbose                                                      Print verbose information
  -e, --external [external...]                                       Repeatable, each will be treated as a new entry. Library or libraries to treat as external in Rollup (see:
                                                                     https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency)
  -ec, --exclude-from-clean [excludeFromClean...]                    Repeatable, each will be treated as a new entry.
                                                                     Files to be excluded from the clean step, useful if you want to process those files manually yourself later.
                                                                     This is in particular useful if you have multiple entrypoints.
                                                                     Note that a String#endsWith check is used to check if an entry in this array matches a path of a file to
                                                                     delete. So you can either use the full relative path, or just the file name.
  -h, --help                                                         display help for command
```

Or, you can set most of these options through a configuration file. This file
should be located at your current working directory (where you're calling this
package). It should be named `.rollup-type-bundlerrc`, optionally suffixed with
`.json`, `.yaml`, or `.yml`.

### Config file fields

- `--dist` maps to `dist`
- `--build-script` maps to `buildScript`
- `--no-build` maps to `noBuild`
- `--no-clean` maps to `noClean`
- `--only-bundle` maps to `onlyBundle`
- `--typings-file-extension` maps to `typingsFileExtension`
- `--output-typings-file-extension` maps to `outputTypingsFileExtension`
- `--verbose` maps to `verbose`
- `--external` maps to `external`
- `--exclude-from-clean` maps to `excludeFromClean`

When using `.rollup-type-bundlerrc` or `.rollup-type-bundlerrc.json` as your
config file you can also use the JSON schema to get schema validation. To do so,
add the following to your config file:

```json
{
  "$schema": "https://raw.githubusercontent.com/favware/rollup-type-bundler/main/assets/rollup-type-bundler.schema.json"
}
```

**Example JSON file**:

```json
{
  "$schema": "https://raw.githubusercontent.com/favware/rollup-type-bundler/main/assets/rollup-type-bundler.schema.json",
  "dist": "./dist",
  "buildScript": "build",
  "verbose": true,
  "external": ["stream", "url"]
}
```

**Example YAML file**:

```yaml
dist: './dist'
buildScript: build
verbose: true
external:
  - stream
  - url
```

### Default values

This library has opinionated defaults for its options. These are as follows:

- `--dist` will default to `./dist`, using the current working directory as the
  reference point for the relative path.
- `--build-script` will default to `build`.
- `--no-build` will default to `false`.
- `--no-clean` will default to `false`.
- `--only-bundle` will default to `false`.
- `--typings-file-extension` will default to `.ts`.
- `--output-typings-file-extension` will default to the value of `--typings-file-extension`.
- `--verbose` will default to `false`.
- `--external` will default to `[]`.
- `--exclude-from-clean` will default to `[]`.

## Buy us some doughnuts

Favware projects are and always will be open source, even if we don't get
donations. That being said, we know there are amazing people who may still want
to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Ko-fi, Paypal, Patreon, GitHub Sponsorships, and
various cryptocurrencies. You can use the buttons below to donate through your
method of choice.

|   Donate With   |                      Address                      |
| :-------------: | :-----------------------------------------------: |
|      Ko-fi      |  [Click Here](https://donate.favware.tech/kofi)   |
|     Patreon     | [Click Here](https://donate.favware.tech/patreon) |
|     PayPal      | [Click Here](https://donate.favware.tech/paypal)  |
| GitHub Sponsors |  [Click Here](https://github.com/sponsors/Favna)  |
|     Bitcoin     |       `1E643TNif2MTh75rugepmXuq35Tck4TnE5`        |
|    Ethereum     |   `0xF653F666903cd8739030D2721bF01095896F5D6E`    |
|    LiteCoin     |       `LZHvBkaJqKJRa8N7Dyu41Jd1PDBAofCik6`        |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a
pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/favware/rollup-type-bundler/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=favware/rollup-type-bundler" />
</a>

[contributing]: ./.github/CONTRIBUTING.md
