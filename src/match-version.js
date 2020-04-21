const fs = require("fs");

module.exports = (githubRef) => {
  const rawPackageJson = fs.readFileSync("package.json", "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  if (!githubRef.match(/^refs\/tags\//)) {
    throw new Error("Current commit is not tagged in git");
  }

  const [, tag] = githubRef.match(/^refs\/tags\/(.*)/);
  const { version } = packageJson;

  if (tag !== version) {
    throw new Error(
      `Git tag (${tag}) does not match package.json version (${version})`
    );
  }

  console.info(`Git tag (${tag}) matches package.json version (${version})`);
};
