const { execSync } = require('child_process');

function checkDependencies(packageJson, dependencies) {
  const dependencyMap = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  for (const dependency of dependencies) {
    if (!dependencyMap[dependency]) {
      console.log(`Installing missing dependency '${dependency}'`);

      execSync(`npm i -D ${dependency}`);
    }
  }
}

module.exports = {
  checkDependencies
};