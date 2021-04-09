module.exports = options => {
  options.module.rules.push({
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-env']
    }
  });
};