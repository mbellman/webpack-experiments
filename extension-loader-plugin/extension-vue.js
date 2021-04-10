const { createLoader } = require('./utilities');

module.exports = createLoader({
  dependencies: [
    'vue-loader',
    'vue-template-compiler'
  ],
  extend: options => {
    options.module.rules.push({
      test: /.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/
    });
  
    const { VueLoaderPlugin } = require('vue-loader');
  
    options.plugins.push(new VueLoaderPlugin());
  }
});