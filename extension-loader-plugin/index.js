/**
 * @internal
 */
const extensionLoaderMap = {
  js: require('./load-js')
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
      const createLoader = extensionLoaderMap[extension];

      if (createLoader) {
        compiler.options.module.rules.push(createLoader());
      } else {
        console.warn(`No loader defined for extension '.${extension}'`);
      }
    }
  }
}

module.exports = {
  ExtensionLoaderPlugin
};