const { VueLoaderPlugin } = require('vue-loader');

module.exports = options => {
  options.module.rules.push({
    test: /.vue$/,
    loader: 'vue-loader',
    exclude: /node_modules/
  });

  options.plugins.push(new VueLoaderPlugin());
};