const { checkDependencies } = require('./utilities');

module.exports = (options, packageJson) => {
  checkDependencies(packageJson, [
    'style-loader',
    'css-loader',
    'sass-loader',
    'node-sass'
  ]);

  options.module.rules.push({
    test: /.scss/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ],
    exclude: /node_modules/
  });
};