# react-webpack-starter

react webpack starter

## Rationale

Using the following versions of libs:

```text
react: ^17.0.2
webpack: ^5.56.0
typescript: ^4.4.3
@babel/core: ^7.15.5
```

(along with a few others, see [package.json](./package.json)), we aim to boostrap a complete React development environment for coding in TypeScript. We want  an option to create a build for production deployments, along with an option to quickly start a development server.

## Pre-requisites

You need at least Node.js v14.x available. See [instructions](https://nodejs.org/en/download/) on how to set up Node.js locally.

## Installing

First clone this repo somewhere:

```shell
git clone https://github.com/valera-rozuvan/react-webpack-starter.git
```

Switch to repo folder, and install NPM deps:

```text
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

total 160K
 16K  favicon.ico
 332  index.html
131K  main.js
 788  main.js.LICENSE.txt
```

The total size of the folder is 160K:

```text
$ du -h ./build

160K	./build
```

## License

Licensed under MIT. See [LICENSE](LICENSE) for more details.
