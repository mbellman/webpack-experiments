module.exports = options => {
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