const { checkDependencies } = require('./utilities');

module.exports = (options, packageJson) => {
  checkDependencies(packageJson, [
    'vue-loader',
    'vue-template-compiler'
  ]);

  options.module.rules.push({
    test: /.vue$/,
    loader: 'vue-loader',
    exclude: /node_modules/
  });

  const { VueLoaderPlugin } = require('vue-loader');

  options.plugins.push(new VueLoaderPlugin());
};