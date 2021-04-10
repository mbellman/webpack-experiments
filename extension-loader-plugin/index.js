const { execSync } = require('child_process');
const chalk = require('chalk');

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
    const missingDependencies = this.getMissingDependencies(packageJson);

    if (missingDependencies.length > 0) {
      console.log(`${chalk.yellow('[Extension Loader Plugin]')} Some packages will need to be installed to support the provided extensions. This may take a minute.\n`);

      missingDependencies.forEach(dependency => this.install(dependency));
    }

    for (const extension of this.extensions) {
      const extensionLoader = extensionLoaderMap[extension];

      if (extensionLoader) {
        extensionLoader.load(compiler.options, packageJson);
      } else {
        console.warn(`No loader defined for extension '.${extension}'`);
      }
    }
  }

  /**
   * @param {object} packageJson
   *
   * @returns {string[]}
   */
  getMissingDependencies(packageJson) {
    const dependencyMap = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    let missingDependencies = [];

    for (const extension of this.extensions) {
      const extensionLoader = extensionLoaderMap[extension];

      if (extensionLoader) {
        const { dependencies } = extensionLoader;

        missingDependencies = missingDependencies.concat(
          dependencies.filter(dependency => !(dependency in dependencyMap))
        );
      }
    }

    return missingDependencies;
  }

  /**
   * @param {string} dependency 
   */
  install(dependency) {
    console.log(`${chalk.yellow('[Extension Loader Plugin]')} Installing missing dependency ${chalk.green(dependency)}`);

    execSync(`npm i -D ${dependency}`);
  }
}

module.exports = {
  ExtensionLoaderPlugin
};