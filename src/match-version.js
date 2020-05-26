const fs = require("fs");

module.exports = (gitRef, prefix = "refs/tags/") => {
  const rawPackageJson = fs.readFileSync("package.json", "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  if (!gitRef) {
    throw new Error("Current commit is not tagged in git");
  }

  const { version } = packageJson;
  const prefixedVersion = `${prefix}${version}`;

  if (gitRef !== prefixedVersion) {
    throw new Error(
      `Git tag (${gitRef}) does not match package.json version (${prefixedVersion})`
    );
  }

  console.info(
    `Git tag (${gitRef}) matches package.json version (${prefixedVersion})`
  );
};
