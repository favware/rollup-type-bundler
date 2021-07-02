<div align="center">

# rollup-type-bundler

**A small CLI tool to bundle types with rollup**

[![GitHub](https://img.shields.io/github/license/favware/rollup-type-bundler)](https://github.com/favware/rollup-type-bundler/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@favware/rollup-type-bundler?color=crimson&logo=npm)](https://www.npmjs.com/package/@favware/rollup-type-bundler)
[![Depfu](https://badges.depfu.com/badges/97d09026f35f8886a8bca2e8c7caa533/count.svg)](https://depfu.com/github/favware/rollup-type-bundler?project_id=28226)

[![Support Server](https://discord.com/api/guilds/512303595966824458/embed.png?style=banner2)](https://join.favware.tech)

</div>

## Description

When you create a library in TypeScript, you will often be able to just publish
it with your current toolset; however, once your library grows and grows, you
might want to make it possible for people of your library to use [TypeScript
Module Augmentation][tma] to merge additional types into the types that you
provide.

Unfortunately, this introduces a big issue in TypeScript. Even when
re-exporting all your interfaces/types/classes in a root `index.d.ts` that you
are referencing in `"types"` in your `package.json`, TypeScript still won't
properly apply folder-nested module augmentation (i.e. a type that's in
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
module comes in - now, you can bundle types in a developer-friendly way and
make life easier for everyone involved.

[tma]: https://www.typescriptlang.org/docs/handbook/declaration-merging.html

### How this works

The library uses [rollup] with [rollup-plugin-dts] under the hood. It will
execute a few steps:

1. It cleans the configured distribution directory (`--dist` flag or `dist` in
   config).
2. It calls the `--build-script` (or `buildScript` in config) to build your code
   with your compiler. This defaults to `build`.
3. It executes [rollup] to bundle your types into 1 `index.d.ts` file, output to
   the configured `dist` directory.
4. It removes all other `.d.ts` and `.d.ts.map` files from your configured
   `dist` directory as they are now superfluous.

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
  -V, --version                     output the version number
  -d, --dist <dist>                 The dist directory to target
  -b, --build-script [buildScript]  The build script to call after cleaning your dist directory (default: "build")
  -v, --verbose                     Print verbose information (default: false)
  -e, --external [external...]      Repeatable, each will be treated as a new entry. Library or libraries to treat as external in Rollup (see:
                                    https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency) (default: [])
  -h, --help                        display help for command
```

Or, you can set most of these options through a configuration file. This
file should be located at your current working directory (where you're
calling this package). It should be named `.rollup-type-bundlerrc`, optionally
suffixed with `.json`, `.yaml`, or `.yml`.

### Config file fields

- `--dist` maps to `dist`
- `--build-script` maps to `buildScript`
- `--verbose` maps to `verbose`
- `--external` maps to `external`

When using `.rollup-type-bundlerrc` or `.rollup-type-bundlerrc.json` as
your config file you can also use the JSON schema to get schema
validation. To do so, add the following to your config file:

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

## Buy us some doughnuts

Favware projects are and always will be open source, even if we don't get
donations. That being said, we know there are amazing people who may still
want to donate just to show their appreciation. Thank you very much in
advance!

We accept donations through Ko-fi, Paypal, Patreon, GitHub Sponsorships,
and various cryptocurrencies. You can use the buttons below to donate
through your method of choice.

|   Donate With   |                      Address                      |
| :-------------: | :-----------------------------------------------: |
|      Ko-fi      |  [Click Here](https://donate.favware.tech/kofi)   |
|     Patreon     | [Click Here](https://donate.favware.tech/patreon) |
|     PayPal      | [Click Here](https://donate.favware.tech/paypal)  |
| GitHub Sponsors |  [Click Here](https://github.com/sponsors/Favna)  |
|     Bitcoin     |       `1E643TNif2MTh75rugepmXuq35Tck4TnE5`        |
|    Ethereum     |   `0xF653F666903cd8739030D2721bF01095896F5D6E`    |
|    LiteCoin     |       `LZHvBkaJqKJRa8N7Dyu41Jd1PDBAofCik6`        |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/favware/rollup-type-bundler/commits?author=Favna" title="Code">💻</a> <a href="#design-Favna" title="Design">🎨</a> <a href="#ideas-Favna" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Favna" title="Maintenance">🚧</a> <a href="#platform-Favna" title="Packaging/porting to new platform">📦</a> <a href="#projectManagement-Favna" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/Nytelife26"><img src="https://avatars.githubusercontent.com/u/22531310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler J Russell</b></sub></a><br /><a href="https://github.com/favware/rollup-type-bundler/commits?author=Nytelife26" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
