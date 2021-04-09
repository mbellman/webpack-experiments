const { checkDependencies } = require('./utilities');

module.exports = (options, packageJson) => {
  checkDependencies(packageJson, [
    'babel-loader',
    '@babel/core',
    '@babel/preset-env'
  ]);

  options.module.rules.push({
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-env']
    }
  });
};