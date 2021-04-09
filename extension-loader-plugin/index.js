/**
 * @internal
 */
const extensionLoaderMap = {
  js: require('./extension-js'),
  scss: require('./extension-scss'),
  vue: require('./extension-vue')
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
    const packageJson = require(`${process.cwd()}/package.json`);

    for (const extension of this.extensions) {
      const addExtensionSupport = extensionLoaderMap[extension];

      if (addExtensionSupport) {
        addExtensionSupport(compiler.options, packageJson);
      } else {
        console.warn(`No loader defined for extension '.${extension}'`);
      }
    }
  }
}

module.exports = {
  ExtensionLoaderPlugin
};