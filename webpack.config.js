const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const webpackConfigs = require('./configs/webpack');

require('dotenv').config();

const SOURCE_FOLDER = 'src';
const BUILD_FOLDER = 'build';
const DEFAULT_SERVER_PORT = 3000;

class RemoveLicenseFilePlugin {
  apply(compiler) { // eslint-disable-line class-methods-use-this
    compiler.hooks.emit.tap('RemoveLicenseFilePlugin', (compilation) => {
      for (const name in compilation.assets) { // eslint-disable-line no-restricted-syntax
        if (name.endsWith('LICENSE.txt')) {
          delete compilation.assets[name];
        }
      }
    });
  }
}

function logger(msg) {
  if (typeof msg === 'string') {
    process.stdout.write(`${msg}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(msg, undefined, 2)}\n`);
  }
}

function getBuildSettings(env) {
  if (!env.BUILD_ENV) {
    throw new Error("Please set Webpack environment variable 'BUILD_ENV'.");
  }

  logger(`BUILD_ENV = '${env.BUILD_ENV}'`);

  let buildSettings = {
    localServer: !!(env.WEBPACK_SERVE),
    webpackMode: env.BUILD_ENV,
  };
  switch (env.BUILD_ENV) {
    case 'development':
    case 'production':
      buildSettings = { ...buildSettings, ...webpackConfigs[env.BUILD_ENV] };
      break;
    default:
      throw new Error("Webpack environment variable 'BUILD_ENV' can be one of `development` or `production`.");
  }

  logger('buildSettings = ');
  logger(buildSettings);

  return buildSettings;
}

function setTsConfigFile(webpackConfig, tsConfigFilePath) {
  const filteredRules = webpackConfig.module.rules
    .filter((rule) => rule && rule.loader === 'ts-loader');

  if (!filteredRules || filteredRules.length === 0 || !filteredRules[0]) {
    throw new Error(`Could not find 'ts-loader' rule to update 'configFile' to '${tsConfigFilePath}'.`);
  } else if (filteredRules.length !== 1) {
    throw new Error("More than 1 'ts-loader' rule found.");
  }

  const rule = filteredRules[0];

  if (!rule.options) {
    rule.options = {};
  }

  rule.options.configFile = tsConfigFilePath;
}

function generateWebpackConfig(buildSettings) {
  const styleLoader = buildSettings.webpackMode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;

  // for CSS module files
  const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 2,
      sourceMap: false, // turned off as causes delay
    },
  };

  // For our normal CSS files - we would like them globally scoped.
  const CSSLoader = {
    loader: 'css-loader',
    options: {
      modules: 'global',
      importLoaders: 2,
      sourceMap: false, // turned off as causes delay
    },
  };

  // Add CSS prefixes for older versions of browsers.
  const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          autoprefixer,
        ],
      },
      sourceMap: false, // turned off as causes delay
    },
  };

  const webpackConfig = {
    entry: path.join(__dirname, SOURCE_FOLDER, 'index.tsx'),
    output: {
      path: path.join(__dirname, BUILD_FOLDER),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            context: __dirname,
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /\.module\.(sa|sc|c)ss$/i,
          use: [styleLoader, CSSLoader, PostCSSLoader, 'sass-loader'],
        },
        {
          test: /\.module\.(sa|sc|c)ss$/i,
          use: [styleLoader, CSSModuleLoader, PostCSSLoader, 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.tsx'],
      alias: {
        ReduxDevtools: path.resolve(__dirname, 'src/utilities/noop.ts'),
      },
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin((() => {
        const reactAppEnv = {};
        const processEnvKeys = Object.keys(process.env);

        for (let i = 0; i < processEnvKeys.length; i += 1) {
          const key = processEnvKeys[i];
          const val = process.env[key];

          if (key.match(/^REACT_APP_.*$/)) {
            reactAppEnv[`process.env.${key}`] = JSON.stringify(val);
          }
        }

        return reactAppEnv;
      })()),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: path.join(__dirname, 'public', 'favicon.ico'),
        hash: true, // For cache busting
        filename: path.join(__dirname, BUILD_FOLDER, 'index.html'),
      }),
      new CopyPlugin({
        patterns: [
          {
            context: path.join(__dirname, 'public'),
            from: '**/*',
            to: '',
            globOptions: {
              dot: false,
              gitignore: false,
              ignore: ['**/index.html', '**/favicon.ico'],
            },
          },
        ],
      }),
    ],
  };

  webpackConfig.mode = buildSettings.webpackMode;
  setTsConfigFile(webpackConfig, path.join(__dirname, 'configs', 'ts', buildSettings.tsconfigFile));

  if (buildSettings.webpackSourceMaps) {
    webpackConfig.devtool = false;
    webpackConfig.plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
      }),
    );
  }

  if (buildSettings.reduxDevtoolsExtension) {
    webpackConfig.resolve.alias.ReduxDevtools = path.resolve(
      __dirname,
      'src/utilities/redux-devtools/extension.ts',
    );
  }

  if (buildSettings.localServer) {
    let port = DEFAULT_SERVER_PORT;

    if (typeof process.env.PORT === 'string' && process.env.PORT.length > 0) {
      port = Number.parseInt(process.env.PORT, 10);

      if (Number.isNaN(port)) {
        throw new Error("If set, environment variable 'PORT' should be a valid integer.");
      } else if (port < 1000 || port > 65535) {
        throw new Error("If set, environment variable 'PORT' should be an integer between '1000' and '65535' (inclusive).");
      }
    }

    logger(`starting dev server on port '${port}'`);

    webpackConfig.devServer = {
      port,
      open: false,
      hot: false,
      historyApiFallback: true,
    };
  }

  // Last plugin is a custom hack to remove generated License txt files in the output build folder.
  // For now, I did not find an official working solution how to disable this behavior.
  webpackConfig.plugins.push(new RemoveLicenseFilePlugin());

  return webpackConfig;
}

const webpackConfigFn = (env) => {
  const buildSettings = getBuildSettings(env);

  return generateWebpackConfig(buildSettings);
};

module.exports = webpackConfigFn;
