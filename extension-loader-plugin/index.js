/**
 * @internal
 */
const extensionLoaderMap = {
  js: require('./load-js'),
  scss: require('./load-scss'),
  vue: require('./load-vue')
};

class ExtensionLoaderPlugin {
  /**
   * @param {string[]} extensions 
   */
  constructor(extensions = []) {
    this.extensions = extensions;
  }

  /**
   * @param {import('webpack').Compiler} compiler 
   */
  apply(compiler) {
    for (const extension of this.extensions) {
      const addExtensionLoader = extensionLoaderMap[extension];

      if (addExtensionLoader) {
        addExtensionLoader(compiler.options);
      } else {
        console.warn(`No loader defined for extension '.${extension}'`);
      }
    }
  }
}

module.exports = {
  ExtensionLoaderPlugin
};