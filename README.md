# react-webpack-starter

react webpack starter

## Rationale

Using the following versions of NPM packages:

- [react](https://www.npmjs.com/package/react) v17.0.2
- [sass](https://www.npmjs.com/package/sass) v1.49.9
- [webpack](https://www.npmjs.com/package/webpack) v5.70.0
- [typescript](https://www.npmjs.com/package/typescript) v4.6.2
- [@babel/core](https://www.npmjs.com/package/@babel/core) v7.17.8
- a few others, see [package.json](./package.json)

we aim to boostrap a complete React development environment for coding in TypeScript. We want an option to create a build for production deployments, along with an option to quickly start a development server. The project uses [dart-sass](https://github.com/sass/dart-sass) for styling; `dart-sass` is compiled to JavaScript as a NPM package (see [sass](https://www.npmjs.com/package/sass)).

A strict requirement for this project is to keep the build as small as possible. Therefore, unneeded Node.js and NPM packages are not included in the resulting build. One should include **only necessary** Node.js back-end code in front-end apps, and do so with caution!

## Pre-requisites

You need at least Node.js v14.x available. See [instructions](https://nodejs.org/en/download/) on how to set up Node.js locally.

## Installing

First clone this repo somewhere:

```shell
git clone https://github.com/valera-rozuvan/react-webpack-starter.git
```

Switch to repo folder, and install dependencies:

```shell
cd /home/user/path/to/react-webpack-starter
npm install
```

## Running

1. Launch a dev env with auto reloading, and source maps:

```shell
npm run start
```

2. Create a build for debugging purposes (with source maps):

```shell
npm run build:local
```

This will generate a `build` folder, which is suitable to be used with a 3rd party static file server. Use for testing purposes only!

3. Create a production build (no source maps, no live reload, minified):

```shell
npm run build:prod
```

This will generate a `build` folder. Use any static file server to host your production front-end app.

## dotenv

Out of the box, this project supports a `.env` configuration file. There is one for local builds (see `.env.local`), and one for production builds (see `.env.prod`). Environment variables from these files are sourced using [dotenv](https://www.npmjs.com/package/dotenv) NPM package. This happens when Webpack is performing a build. Variable names which have a prefix `REACT_APP_` will be available at runtime in the React app via the global object `process.env` (without the prefix). When you run this project, you can open the browser's JavaScript console, and observe the following:

```text
process.env.REACT_APP_BASE_URL = 'https://example.com'
process.env.REACT_APP_API_URL = 'https://api.example.com'
```

The above variables are defined in the `.env.*` files.

NOTE: [dotenv](https://www.npmjs.com/package/dotenv) NPM package is used only at build time. It is not included in the resulting build.

## Minimal size

Out of the box, when building this repo for production, you will get 5 files in the `build` folder:

```text
$ ls -ahl ./build

total 168K

 16K  favicon.ico
 376  index.html
135K  main.js
 788  main.js.LICENSE.txt
1,1K  reset.css
```

The total size of the folder is 160K:

```text
$ du -h ./build

168K	./build
```

## License

Licensed under MIT. See [LICENSE](LICENSE) for more details.
