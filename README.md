# react-webpack-starter

react webpack starter

## Rationale

Using the following versions of libs:

- [react](https://www.npmjs.com/package/react) v17.0.2
- [webpack](https://www.npmjs.com/package/webpack) v5.70.0
- [typescript](https://www.npmjs.com/package/typescript) v4.6.2
- [@babel/core](https://www.npmjs.com/package/@babel/core) v7.17.8

(along with a few others, see [package.json](./package.json)), we aim to boostrap a complete React development environment for coding in TypeScript. We want  an option to create a build for production deployments, along with an option to quickly start a development server.

## Pre-requisites

You need at least Node.js v14.x available. See [instructions](https://nodejs.org/en/download/) on how to set up Node.js locally.

## Installing

First clone this repo somewhere:

```shell
git clone https://github.com/valera-rozuvan/react-webpack-starter.git
```

Switch to repo folder, and install NPM deps:

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

## Minimal size

Out of the box, when building this repo for production, you will get 4 files in the `build` folder:

```text
$ ls -ahl ./build

total 168K

 16K  favicon.ico
 418  index.html
131K  main.js
 788  main.js.LICENSE.txt
1,1K  reset.css
  25  styles.css
```

The total size of the folder is 160K:

```text
$ du -h ./build

168K	./build
```

## License

Licensed under MIT. See [LICENSE](LICENSE) for more details.
