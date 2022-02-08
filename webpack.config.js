const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

if (!process.env.ENV) {
  throw new Error("Please set environment variable 'ENV'.");
}

let dotEnvConfig = "";
switch (process.env.ENV) {
  case "prod":
    dotEnvConfig = ".env.prod";
    break;
  case "local":
    dotEnvConfig = ".env.local";
    break;
  default:
    throw new Error("Environment variable 'ENV' can be one of `prod` or `local`.");
}
require("dotenv").config({path: path.join(__dirname, dotEnvConfig)});

const SOURCE_FOLDER = "src";
const BUILD_FOLDER = "build";

const webpackConfig = {
  entry: path.join(__dirname, SOURCE_FOLDER, "index.tsx"),
  output: {
    path: path.join(__dirname, BUILD_FOLDER),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          context: __dirname,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
  },
  plugins: [
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
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
      hash: true, // For cache busting
      filename: path.join(__dirname, BUILD_FOLDER, "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.join(__dirname, "public"),
          from: "**/*",
          to: "",
          globOptions: {
            dot: false,
            gitignore: false,
            ignore: ["**/index.html", "**/favicon.ico"],
          },
        },
      ],
    }),
  ],
};

const setTsConfigFile = (configFile) => {
  const filteredRules = webpackConfig.module.rules
    .filter((rule) => rule && rule.loader === "ts-loader");

  if (filteredRules.length === 0 || !filteredRules[0]) {
    throw new Error(`Could not find 'ts-loader' rule to update 'configFile' to '${configFile}'.`);
  } else if (filteredRules.length !== 1) {
    throw new Error("More than 1 'ts-loader' rule found. ");
  }

  const rule = filteredRules[0];

  if (!rule.options) {
    rule.options = {};
  }

  rule.options.configFile = configFile;
};

if (process.env.WEBPACK_MODE === "production") {
  webpackConfig.mode = "production";
  setTsConfigFile("tsconfig.prod.json");
} else {
  webpackConfig.mode = "development";
  setTsConfigFile("tsconfig.local.json");
}

if (process.env.WEBPACK_SOURCE_MAPS === "true") {
  webpackConfig.devtool = false;
  webpackConfig.plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    })
  );
}

if (process.env.WEBPACK_DEV_SERVER === "true") {
  webpackConfig.devServer = {
    port: 3000,
    open: false,
    hot: false,
  };
}

module.exports = webpackConfig;
