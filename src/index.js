const matchVersion = require("./match-version");
const core = require("@actions/core");

try {
  matchVersion(process.env.GITHUB_REF, process.env.TAG_PREFIX);
} catch (error) {
  core.error(error.message);
  process.exit(1);
}
