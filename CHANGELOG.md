# Changelog

All notable changes to this project will be documented in this file.

# [4.0.0](https://github.com/favware/rollup-type-bundler/compare/v3.3.0...v4.0.0) - (2025-01-05)

## 🏠 Refactor

- Remove various single dash aliases for commander v13 compatibility ([2d8e3ef](https://github.com/favware/rollup-type-bundler/commit/2d8e3ef46a7cef383fffbd41b0b62125095f1490))
  - 💥 **BREAKING CHANGE:** Removed `-nb` as alias for `--no-build`
  - 💥 **BREAKING CHANGE:** Removed `-nc` as alias for `--no-clean`
  - 💥 **BREAKING CHANGE:** Removed `-ob` as alias for `--only-bundle`
  - 💥 **BREAKING CHANGE:** Removed `-ot` as alias for `--output-typings-file-extension`
  - 💥 **BREAKING CHANGE:** Removed `-ec` as alias for `--exclude-from-clean`

## 🐛 Bug Fixes

- **deps:** Update dependency commander to v13 ([1f14146](https://github.com/favware/rollup-type-bundler/commit/1f141467c091ae52fb3e09fc4572b7413f40c8c0))
- **deps:** Update all non-major dependencies ([9db03a4](https://github.com/favware/rollup-type-bundler/commit/9db03a4520e927dbf80b98cb55ea0848c76a112d)) ([#334](https://github.com/favware/rollup-type-bundler/pull/334) by @renovate[bot])
- **deps:** Update dependency rollup to ^4.27.2 ([8802523](https://github.com/favware/rollup-type-bundler/commit/880252320444772363022a9b506c5eefb08787ea)) ([#329](https://github.com/favware/rollup-type-bundler/pull/329) by @renovate[bot])
- **deps:** Update all non-major dependencies ([d9f24a6](https://github.com/favware/rollup-type-bundler/commit/d9f24a65ae405fb2ac2dfad92ff7e3adb3ddb017)) ([#328](https://github.com/favware/rollup-type-bundler/pull/328) by @renovate[bot])
- **deps:** Update all non-major dependencies ([55e5d1f](https://github.com/favware/rollup-type-bundler/commit/55e5d1f22e8a477c7b145ef0ec6648ce4a8b715f)) ([#325](https://github.com/favware/rollup-type-bundler/pull/325) by @renovate[bot])
- **deps:** Update dependency rollup to ^4.24.0 ([a4ec87e](https://github.com/favware/rollup-type-bundler/commit/a4ec87e7d51d95094e26ac68461a569afd30f162)) ([#320](https://github.com/favware/rollup-type-bundler/pull/320) by @renovate[bot])
- **deps:** Update dependency rollup to ^4.21.0 ([3687c69](https://github.com/favware/rollup-type-bundler/commit/3687c699dabf2d620df4e798c60c4ba8d908e0e6)) ([#312](https://github.com/favware/rollup-type-bundler/pull/312) by @renovate[bot])
- **deps:** Update all non-major dependencies ([b92460e](https://github.com/favware/rollup-type-bundler/commit/b92460e500aab621788738a5eef9b4fcdb953f30)) ([#298](https://github.com/favware/rollup-type-bundler/pull/298) by @renovate[bot])
- **deps:** Update dependency rollup to ^4.16.0 ([04adfaa](https://github.com/favware/rollup-type-bundler/commit/04adfaa2b79fca5e7de8be6737ab0807794f24b0)) ([#292](https://github.com/favware/rollup-type-bundler/pull/292) by @renovate[bot])
- **deps:** Update dependency rollup to ^4.14.1 ([ce8f0de](https://github.com/favware/rollup-type-bundler/commit/ce8f0de28ecdfe019a6d55e20c97c13e2eb7b44e)) ([#289](https://github.com/favware/rollup-type-bundler/pull/289) by @renovate[bot])
- **deps:** Update dependency commander to v12 ([471c556](https://github.com/favware/rollup-type-bundler/commit/471c556056ac9800d58fca993439b2d9c9ed39e7)) ([#274](https://github.com/favware/rollup-type-bundler/pull/274) by @renovate[bot])
- **deps:** Update dependency rollup to ^4.9.6 ([2e7b07f](https://github.com/favware/rollup-type-bundler/commit/2e7b07fbc52aa6de6cc0471216f9d4315517a607)) ([#270](https://github.com/favware/rollup-type-bundler/pull/270) by @renovate[bot])
- **deps:** Update all non-major dependencies ([dab6fb8](https://github.com/favware/rollup-type-bundler/commit/dab6fb8014fcbe967ecacbeb88bdae7878d3c937)) ([#269](https://github.com/favware/rollup-type-bundler/pull/269) by @renovate[bot])

# [3.3.0](https://github.com/favware/rollup-type-bundler/compare/v3.3.0...v3.3.0) - (2024-01-15)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([7d3130e](https://github.com/favware/rollup-type-bundler/commit/7d3130e3917636dd001c4e5f444fe243d15105ee))
- **deps:** Update dependency rollup to ^4.9.1 ([fbb0a45](https://github.com/favware/rollup-type-bundler/commit/fbb0a456de92e6ed78b417a0f6ced7c11f10c753))

## 🚀 Features

- Add `--output-typings-file-extension` to make it possible to customize the output file extension separately from the input file extension ([4ec5e88](https://github.com/favware/rollup-type-bundler/commit/4ec5e8828380365752cb1529c2e226e01b3683ad))

# [3.2.1](https://github.com/favware/rollup-type-bundler/compare/v3.2.1...v3.2.1) - (2023-12-05)

## 🐛 Bug Fixes

- Normalize path separators for excludeFromClean to ensure PowerShell & Sh support ([66e6b28](https://github.com/favware/rollup-type-bundler/commit/66e6b28f3f91ddb559b7df9c990bc59cbf9b1a3c))

# [3.2.0](https://github.com/favware/rollup-type-bundler/compare/v3.2.0...v3.2.0) - (2023-12-03)

## 📝 Documentation

- **readme:** Update readme to mention previously added options ([13a9c7a](https://github.com/favware/rollup-type-bundler/commit/13a9c7a325632ebeb0b7a0845a5585122abcdb9e))

## 🚀 Features

- Add `--exclude-from-clean` option ([a5ec99b](https://github.com/favware/rollup-type-bundler/commit/a5ec99b1c0c1c8ef0254ed5845d8a11a4d3070f5))

# [3.1.0](https://github.com/favware/rollup-type-bundler/compare/v3.1.0...v3.1.0) - (2023-12-01)

## 🚀 Features

- Add `noBuild`, `noClean`, and `onlyBundle` options ([57254d5](https://github.com/favware/rollup-type-bundler/commit/57254d5f78ad86cf3f82d2c61733a4da24b57a31))

# [3.0.0](https://github.com/favware/rollup-type-bundler/compare/v3.0.0...v3.0.0) - (2023-12-01)

## 🐛 Bug Fixes

- Update rollup to v4.5.2 ([f548af3](https://github.com/favware/rollup-type-bundler/commit/f548af3387cfd4ce774c19a339ea80dd37219c55))
- **deps:** Update dependency rollup to ^4.4.0 ([5aded14](https://github.com/favware/rollup-type-bundler/commit/5aded147adf1547022a974ed809bdf760c0d1871))
- **deps:** Update dependency rollup to ^4.1.1 ([09c47a7](https://github.com/favware/rollup-type-bundler/commit/09c47a765a0d6f58edee05880fce393948f1104e))
- **deps:** Update dependency rollup to v4 (#238) ([3c7737c](https://github.com/favware/rollup-type-bundler/commit/3c7737ce4b0ecc099abdacc4f1c02401bf1a446d))
- **deps:** Update dependency rollup to ^3.29.3 ([d6daebb](https://github.com/favware/rollup-type-bundler/commit/d6daebb76ae58b08ef8440f9411f3a9bf044fc24))
- **deps:** Update dependency rollup to ^3.29.1 ([5d65b9c](https://github.com/favware/rollup-type-bundler/commit/5d65b9c3e3677d5327e536513c1a4081f6af7b93))
- **deps:** Update dependency rollup-plugin-dts to v6 (#228) ([a65a87d](https://github.com/favware/rollup-type-bundler/commit/a65a87d24abc55cb382e97c7592a8b4b8ac44dcf))
- **deps:** Update dependency commander to v11 (#211) ([a27ba0f](https://github.com/favware/rollup-type-bundler/commit/a27ba0f4c9e6ad33f6e967abd80e06ceb799ca4d))
- **deps:** Update dependency rollup to ^3.25.0 ([112112e](https://github.com/favware/rollup-type-bundler/commit/112112e65d9500b03c1dd028b786ff211fc5c384))
- **deps:** Update dependency rollup to ^3.21.2 (#202) ([e1e1640](https://github.com/favware/rollup-type-bundler/commit/e1e1640b67b22b596d99b4701c56f4804f863806))
- **deps:** Update dependency rollup to ^3.14.0 ([637025b](https://github.com/favware/rollup-type-bundler/commit/637025bf755f72ab920f29cd008516278797235b))
- **deps:** Update dependency rollup to ^3.5.0 ([5612d29](https://github.com/favware/rollup-type-bundler/commit/5612d29dc209ea5f0167f5073e621de34d526d4e))

## 📝 Documentation

- **readme:** Remove all contributors ([910d562](https://github.com/favware/rollup-type-bundler/commit/910d562a4577c96a2cb87c37760f1f64a0a9b41f))

## 🚀 Features

- Add support for custom typings file extensions ([06f37d1](https://github.com/favware/rollup-type-bundler/commit/06f37d11b2e7d43051e0dec7a659fcd9a76f0fba))
- Bump minimum NodeJS version to 18 ([0d6ad56](https://github.com/favware/rollup-type-bundler/commit/0d6ad56f9ee78631698b3527a40c65062783c744))
  - 💥 **BREAKING CHANGE:** This update drops support for NodeJS v14 and NodeJS v16, please update to v18 or higher.
- Update to Commander v10 ([a6d0e74](https://github.com/favware/rollup-type-bundler/commit/a6d0e742544223d0eb7b682698dcd959bf39039a))
  - 💥 **BREAKING CHANGE:** Drops support for Node 14

# [2.0.0](https://github.com/favware/rollup-type-bundler/compare/v1.0.11...v2.0.0) - (2022-10-16)

## 🏠 Refactor

- Bump to v2.0.0 ([654e4c7](https://github.com/favware/rollup-type-bundler/commit/654e4c7468cab3c163e09186e112ffdf35411ff9))
  - 💥 **BREAKING CHANGE:** This package now depends on Rollup v3 and rollup-plugin-dts v5.
Please refer to their changelogs for further breaking changes.

## 🐛 Bug Fixes

- **deps:** Update dependency rollup-plugin-dts to v5 (#161) ([154423f](https://github.com/favware/rollup-type-bundler/commit/154423f211c3f261731dd61fdcb9c912f072a91a))
- **deps:** Update dependency rollup to v3 (#160) ([b8a49c4](https://github.com/favware/rollup-type-bundler/commit/b8a49c42f249d889698dec6f801ca1e2b355f085))
- **deps:** Update dependency rollup-plugin-dts to ^4.2.3 (#156) ([a4e2715](https://github.com/favware/rollup-type-bundler/commit/a4e2715e71c82bd163a9f676c10adeb2a0032570))
- **deps:** Update dependency @sapphire/utilities to ^3.11.0 ([0c97ba2](https://github.com/favware/rollup-type-bundler/commit/0c97ba2c4fcac907c71615282ef4497a003689e5))
- **deps:** Update dependency @sapphire/utilities to ^3.9.3 (#144) ([982eb19](https://github.com/favware/rollup-type-bundler/commit/982eb190480b7470dc3562ebe221992af6ae9866))

# [1.0.11](https://github.com/favware/rollup-type-bundler/compare/v1.0.10...v1.0.11) - (2022-08-20)

## 🐛 Bug Fixes

- Bump dependencies ([8da26cf](https://github.com/favware/rollup-type-bundler/commit/8da26cf2c61ec1c9a1eb4dcae74f4ebd5850dc33))
- **deps:** Update dependency @sapphire/utilities to ^3.9.0 ([54e9296](https://github.com/favware/rollup-type-bundler/commit/54e92964dade4fcab3b465bf4c060ed5923a0bdd))

# [1.0.10](https://github.com/favware/rollup-type-bundler/compare/v1.0.9...v1.0.10) - (2022-07-30)

## 🐛 Bug Fixes

- Update dependecies ([d7dda87](https://github.com/favware/rollup-type-bundler/commit/d7dda87cbffe4c6b779ae3856028ddd36800583f))
- **deps:** Update dependency @sapphire/utilities to ^3.7.0 ([0af5319](https://github.com/favware/rollup-type-bundler/commit/0af5319a0446fc44f278c377db99304f85bbbd1e))

# [1.0.11](https://github.com/favware/rollup-type-bundler/compare/v1.0.10...v1.0.11) - (2022-08-20)

## 🐛 Bug Fixes

- Bump dependencies ([8da26cf](https://github.com/favware/rollup-type-bundler/commit/8da26cf2c61ec1c9a1eb4dcae74f4ebd5850dc33))
- **deps:** Update dependency @sapphire/utilities to ^3.9.0 ([54e9296](https://github.com/favware/rollup-type-bundler/commit/54e92964dade4fcab3b465bf4c060ed5923a0bdd))

# [1.0.10](https://github.com/favware/rollup-type-bundler/compare/v1.0.9...v1.0.10) - (2022-07-30)

## 🐛 Bug Fixes

- Update dependecies ([d7dda87](https://github.com/favware/rollup-type-bundler/commit/d7dda87cbffe4c6b779ae3856028ddd36800583f))
- **deps:** Update dependency @sapphire/utilities to ^3.7.0 ([0af5319](https://github.com/favware/rollup-type-bundler/commit/0af5319a0446fc44f278c377db99304f85bbbd1e))

# [1.0.10](https://github.com/favware/rollup-type-bundler/compare/v1.0.9...v1.0.10) - (2022-07-30)

## 🐛 Bug Fixes

- Update dependecies ([d7dda87](https://github.com/favware/rollup-type-bundler/commit/d7dda87cbffe4c6b779ae3856028ddd36800583f))
- **deps:** Update dependency @sapphire/utilities to ^3.7.0 ([0af5319](https://github.com/favware/rollup-type-bundler/commit/0af5319a0446fc44f278c377db99304f85bbbd1e))

# [1.0.9](https://github.com/favware/rollup-type-bundler/compare/v1.0.8...v1.0.9) - (2022-06-26)

## 🐛 Bug Fixes

- Fixed regression issue with externals after previous release ([53f4272](https://github.com/favware/rollup-type-bundler/commit/53f42729993e78816c9f371150cf1f73acf3453c))

# [1.0.8](https://github.com/favware/rollup-type-bundler/tree/v1.0.8) - (2022-06-22)

## 🐛 Bug Fixes

- Properly handle commander defaults ([3325288](https://github.com/favware/rollup-type-bundler/commit/3325288992e98debad192892e93f27a88c569441))

### [1.0.7](https://github.com/favware/rollup-type-bundler/compare/v1.0.6...v1.0.7) (2022-01-06)

### Bug Fixes

- add typescript to dependencies ([ba3cfa8](https://github.com/favware/rollup-type-bundler/commit/ba3cfa82ff167ad8721281e93766cc742c69c35f))
- **deps:** update all non-major dependencies ([d3642ac](https://github.com/favware/rollup-type-bundler/commit/d3642ac1ae0315873c3c10691486d60c983cf545))

### [1.0.6](https://github.com/favware/rollup-type-bundler/compare/v1.0.5...v1.0.6) (2021-10-21)

### Bug Fixes

- remove use of timers api to ensure this library works with Node 14 ([57c339e](https://github.com/favware/rollup-type-bundler/commit/57c339ea19f86b9674ca47640c81060b101200db))

### [1.0.5](https://github.com/favware/rollup-type-bundler/compare/v1.0.4...v1.0.5) (2021-10-04)

### Bug Fixes

- **deps:** update all non-major dependencies ([f6cc93f](https://github.com/favware/rollup-type-bundler/commit/f6cc93f13f480a9cddda8359d1adc6cd94f8080a))
- **deps:** update dependency colorette to ^2.0.14 ([#32](https://github.com/favware/rollup-type-bundler/issues/32)) ([b0ac896](https://github.com/favware/rollup-type-bundler/commit/b0ac89638ddeaf24ac402eb2193e928f2d7f1ed3))
- use latest versions for dependencies ([bfbce5c](https://github.com/favware/rollup-type-bundler/commit/bfbce5c030aa51252aac957b357021e209efa6ea))

### [1.0.4](https://github.com/favware/rollup-type-bundler/compare/v1.0.3...v1.0.4) (2021-10-01)

### Bug Fixes

- **deps:** update dependency colorette to v2 ([#28](https://github.com/favware/rollup-type-bundler/issues/28)) ([91e78dd](https://github.com/favware/rollup-type-bundler/commit/91e78dd18217daa5e0d4f2d170de74094d31c9ce))
- **deps:** update dependency rollup to ^2.57.0 ([418f97a](https://github.com/favware/rollup-type-bundler/commit/418f97aea3a0aae9d028edd0e8fb7be3078b3155))
- **deps:** update dependency rollup-plugin-dts to v4 ([#29](https://github.com/favware/rollup-type-bundler/issues/29)) ([1ce08d6](https://github.com/favware/rollup-type-bundler/commit/1ce08d6c0726afd322fea85cc80955debb94ab42))

### [1.0.3](https://github.com/favware/rollup-type-bundler/compare/v1.0.2...v1.0.3) (2021-07-12)

### Bug Fixes

- change engine requirement from Node 16 to Node 14 ([6ba5e28](https://github.com/favware/rollup-type-bundler/commit/6ba5e28dad22534ff673650b76da90c437b7f0d7))

### [1.0.2](https://github.com/favware/rollup-type-bundler/compare/v1.0.1...v1.0.2) (2021-07-04)

### Bug Fixes

- fixed rollup not outputting to disk ([f2bcd33](https://github.com/favware/rollup-type-bundler/commit/f2bcd33fa22ebf812909a476cb1350c57886a127))

### [1.0.1](https://github.com/favware/rollup-type-bundler/compare/v1.0.0...v1.0.1) (2021-07-02)

### Bug Fixes

- set an opinionated default of "./dist" for the "--dist" option ([3e6e096](https://github.com/favware/rollup-type-bundler/commit/3e6e096218ac8c02878bb4fc0693ab35dc78ad77))

## [1.0.0](https://github.com/favware/rollup-type-bundler/compare/v0.0.1-next.0...v1.0.0) (2021-07-02)

### Features

- improve logging ([7953008](https://github.com/favware/rollup-type-bundler/commit/7953008c2527e083e2eb9a2bd52fc81d88ec2b23))
- log when steps are completed ([f2e7e3b](https://github.com/favware/rollup-type-bundler/commit/f2e7e3b7f53af3ddf4e13ae106a7258b41c7b637))

### Bug Fixes

- do not publish source maps ([21c9d93](https://github.com/favware/rollup-type-bundler/commit/21c9d934f2cd9505ebc51cef427ee905cec8e487))
- ensure dist can be set through config file ([9a1b102](https://github.com/favware/rollup-type-bundler/commit/9a1b1022a3f2b2bed945e6304e8220a5f7211b27))
- fixed file scanning in type bundler ([9375549](https://github.com/favware/rollup-type-bundler/commit/93755495277cfc2577f081236c2b169474e1b7c1))
- fixed getting config file paths ([b644e3b](https://github.com/favware/rollup-type-bundler/commit/b644e3b23028b73878ed5f77a7d18d40c4710789))
- use options.dist for filtering out index.d.ts in cleaning extraneous types ([53fb21e](https://github.com/favware/rollup-type-bundler/commit/53fb21e1c485400dd432fa24e59e064aeab25f91))
- wait for files to be build before running rollup ([1eb2b07](https://github.com/favware/rollup-type-bundler/commit/1eb2b079aa7ec4d9ec60f5889f1bd244d5d4d019))

### 0.0.1-next.0 (2021-07-01)

### Features

- add base CLI tool and parsing options ([785ac0c](https://github.com/favware/rollup-type-bundler/commit/785ac0c8fb96991521b39cbb909e1c05ee609156))
- add build code and remove dist exist checking ([b91b873](https://github.com/favware/rollup-type-bundler/commit/b91b87334fd99f78332c07be81745d21597ce4e0))
- add first 2 actions ([a8ca033](https://github.com/favware/rollup-type-bundler/commit/a8ca03354c555d7427c28104440889b7474b4168))
- add JSON schema ([a6b3987](https://github.com/favware/rollup-type-bundler/commit/a6b39874f760cf8b00027aed045a5d3da34f5fcd))
- add README ([ebbafdf](https://github.com/favware/rollup-type-bundler/commit/ebbafdf1811bce93bde765e85cc0fa1fcc18b573))
- add rollup bundling command step ([b40916d](https://github.com/favware/rollup-type-bundler/commit/b40916dbffb1a1bece6f47c5bb9aafa5d4788796))
- add specifying dist and buildScript ([c23325a](https://github.com/favware/rollup-type-bundler/commit/c23325a9e14773469a457e66c7d703146f5778a7))
- scaffold up repo ([6f579f0](https://github.com/favware/rollup-type-bundler/commit/6f579f0b8b16bc5958d83336d2662fe70d1d1940))

### Bug Fixes

- do not use cache for bundling types ([ef5c57b](https://github.com/favware/rollup-type-bundler/commit/ef5c57b0e63a146ad91b418a90eb4db5dd2aa1ad))
- exit on error of build and clean ([958cd5f](https://github.com/favware/rollup-type-bundler/commit/958cd5ffd5af7fdaccfb36a53adc604a2d28674a))
