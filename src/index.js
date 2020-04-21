const matchVersion = require("./match-version");

try {
  matchVersion(process.env.GITHUB_REF);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
