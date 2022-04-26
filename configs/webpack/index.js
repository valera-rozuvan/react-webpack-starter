const development = require('./build-settings.development');
const production = require('./build-settings.production');

const webpackConfigs = {
  development,
  production,
};

module.exports = webpackConfigs;
