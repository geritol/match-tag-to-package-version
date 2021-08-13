const matchVersion = require("./match-version");
const core = require("@actions/core");

try {
  const prefix = process.env.INPUT_TAG_PREFIX ? process.env.INPUT_TAG_PREFIX : process.env.TAG_PREFIX
  matchVersion(process.env.GITHUB_REF, prefix);
} catch (error) {
  core.error(error.message);
  process.exit(1);
}
