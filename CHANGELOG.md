# Changelog

All notable changes to this project will be documented in this file.

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
