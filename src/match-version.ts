import * as fs from "fs";
import * as core from "@actions/core";

export default (gitRef: string, prefix = "") => {
  const rawPackageJson = fs.readFileSync("package.json", "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  const refsTags = "refs/tags/";
  if (!gitRef.startsWith(refsTags)) {
    throw new Error("Current commit is not tagged in git");
  }

  const { version } = packageJson;

  if (!prefix.startsWith(refsTags)) {
    prefix = `${refsTags}${prefix}`;
  }

  const prefixedVersion = `${prefix}${version}`;

  if (gitRef !== prefixedVersion) {
    throw new Error(
      `Git tag (${gitRef}) does not match package.json version (${prefixedVersion})`
    );
  }

  core.info(
    `Git tag (${gitRef}) matches package.json version (${prefixedVersion})`
  );

  core.setOutput("PACKAGE_VERSION", version);
  core.setOutput("TAG_VERSION", gitRef.substring(refsTags.length));
};
