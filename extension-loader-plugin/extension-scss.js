const { createLoader } = require('./utilities');

module.exports = createLoader({
  dependencies: [
    'style-loader',
    'css-loader',
    'sass-loader',
    'node-sass'
  ],
  extend: options => {
    options.module.rules.push({
      test: /.scss/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ],
      exclude: /node_modules/
    });
  }
});