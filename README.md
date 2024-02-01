# react-webpack-starter

an opinionated react with webpack starter

## Rationale

Using the following versions of NPM packages:

- dependencies
  - [react](https://www.npmjs.com/package/react) v18.2.0
  - [react-dom](https://www.npmjs.com/package/react-dom) v18.2.0
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom) v6.21.3
  - [redux](https://www.npmjs.com/package/redux) v5.0.1
  - [react-redux](https://www.npmjs.com/package/react-redux) v9.1.0
- devDependencies
  - [sass](https://www.npmjs.com/package/sass) v1.70.0
  - [webpack](https://www.npmjs.com/package/webpack) v5.90.0
  - [typescript](https://www.npmjs.com/package/typescript) v5.3.3
  - [@babel/core](https://www.npmjs.com/package/@babel/core) v7.23.9
  - a few others; see [package.json](./package.json)

we aim to bootstrap a complete React development environment for coding in TypeScript. We want an option to create a build for production deployments, along with an option to quickly start a development server. The project uses [dart-sass](https://github.com/sass/dart-sass) for styling; `dart-sass` is compiled to JavaScript as a NPM package (see [sass](https://www.npmjs.com/package/sass)).

A strict requirement for this project is to keep the build as small as possible. Therefore, unneeded Node.js and NPM packages are not included in the resulting build. One should include **only necessary** Node.js back-end code in front-end apps (and do so with caution)!

## Older version of React

As time progresses, React is being updated. New major versions keep appearing every year or so. Starter for older version of React will live in separate branches.

- React v17 - checkout branch `react_v17`
- React v16 - checkout branch `react_v16`

## Pre-requisites

You need at least v16.x of Node.js available. See [instructions](https://nodejs.org/en/download/) on how to set up Node.js locally. The author has tested this project using the following versions of Node.js:

```text
v16.20.2
v18.19.0
v20.11.0
```

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

Several `npm` scripts are included for running, building, and doing other maintenance tasks. See [package.json](./package.json), section `scripts`. Below, a short description is given for each `npm` script.

### Local development

Launch a dev server with auto reloading, and source maps for debugging:

```shell
npm run start
```

You can now open [localhost:3000](http://localhost:3000/) in your browser, and observe the live application.

If you want to change the default port `3000`, add the line:

```text
PORT=8001
```

to the end of `.env` file. Replace `8001` with the desired port number. Now, you should be able to access the local site via the desired port [localhost:8001](http://localhost:8001/).

### Generating a build for debugging

Create a build for debugging purposes (source maps will be included, NO live reload):

```shell
npm run build:local
```

This will generate a `build` folder, which is suitable to be used with a 3rd party static file server. Use for testing purposes only!

### Production build

Create a minified production build (NO source maps, NO live reload):

```shell
npm run build
```

This will generate a `build` folder. Use any static file server to host your production front-end app.

### Linting

This project uses [ESLint](https://eslint.org/) to enforce code style and catch simple syntax errors while coding.

Check all files using settings from `.eslintrc.js` config; report warnings and errors to `stdout`:

```shell
npm run lint
```

Try to automatically fix some warnings and errors:

```shell
npm run lint:fix
```

**NOTE 1**: Author's preference is to use [airbnb coding style](https://airbnb.io/javascript/). You can change that in [.eslintrc.js](.eslintrc.js) config file.

**NOTE 2**: Some files/directories are excluded when linting. See [.eslintignore](.eslintignore) config file.

**NOTE 3**: Some base settings such as character encoding, and indent size, are set in [.editorconfig](./.editorconfig) config file.

## Redux DevTools

Out of the box, this project includes support for the wonderful [Redux DevTools](https://github.com/reduxjs/redux-devtools) extension. While developing, you can use the Redux browser extension to view the Redux store. See [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools/tree/main/extension#installation) guide for installation instructions.

For production builds, this is skipped. The extension code is not included in the final bundle.

## dotenv

Out of the box, this project supports a `.env` configuration file. Environment variables from this file are sourced using [dotenv](https://www.npmjs.com/package/dotenv) NPM package. This happens when Webpack is performing a build. Variable names which have a prefix `REACT_APP_` will be available at runtime in the React app via the global object `process.env`. When you run this project, you can open the browser's JavaScript console, and observe the following:

```text
process.env.REACT_APP_BASE_URL = 'https://example.com'
process.env.REACT_APP_API_URL = 'https://api.example.com'
```

![ENV vars preview in browser](./env_vars_preview_in_browser.png "ENV vars preview in browser")

The above variables are defined in the [.env](./.env) file.

NOTE: The `dotenv` NPM package is used only at build time. It is not included in the resulting build.

## CSS modules

You can define global CSS styles, or you can use CSS modules. Search this project for `colorBg` string. This is a CSS class name. You will see that it's defined in several places. Depending on the file name, the definition of `colorBg` is treated differently. Please read more about [CSS modules](https://css-tricks.com/css-modules-part-1-need/) (or [another wonderful](https://blog.logrocket.com/a-deep-dive-into-css-modules/) resource) if you are not familiar with this concept.

If the file name has the following schema:

- `*.module.css`
- `*.module.scss`
- `*.module.sass`

then that file will be treated as a CSS module. Otherwise, the styles will be applied globally.

---

## license

The project `'react-webpack-starter'` is licensed under the MIT License.

See [LICENSE](./LICENSE) for more details.

The latest source code can be retrieved from one of several mirrors:

1. [github.com/valera-rozuvan/react-webpack-starter](https://github.com/valera-rozuvan/react-webpack-starter)

2. [gitlab.com/valera-rozuvan/react-webpack-starter](https://gitlab.com/valera-rozuvan/react-webpack-starter)

3. [git.rozuvan.net/react-webpack-starter](https://git.rozuvan.net/react-webpack-starter)

Copyright (c) 2022-2024 [Valera Rozuvan](https://valera.rozuvan.net/)
