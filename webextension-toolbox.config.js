'use strict';

const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = {
  webpack: (config, { vendor }) => {
    const isDev = process.argv.includes('dev');
    const envName = isDev ? 'development' : 'production';

    config.plugins.push(new DefinePlugin({
      IS_PRODUCTION_BUILD: !isDev,
    }))

    return config
  },
  copyIgnore: [
    path.resolve('**/*.ts'),
  ]
};
