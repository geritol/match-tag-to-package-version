const matchVersion = require("./match-version");
const mock = require("mock-fs");
const expect = require("chai").expect;

describe("matchVersion", () => {
  afterEach(() => {
    mock.restore();
  });

  it("should not throw an error when tag and version match", () => {
    const version = "v0.0.0";
    mock({
      "package.json": JSON.stringify({ version }),
    });

    matchVersion(`refs/tags/${version}`);
  });

  it("should throw an error when not on ref tag", () => {
    const version = "v0.0.0";
    mock({
      "package.json": JSON.stringify({ version }),
    });

    expect(() => matchVersion(`refs/foo`)).to.throw(Error, "not tagged");
  });

  it("should throw an error there is no package.json present", () => {
    mock({});
    expect(() => matchVersion(`refs/tags/some-tag`)).to.throw(
      Error,
      "no such file or directory"
    );
  });

  it("should throw an error when package.json is malformed", () => {
    mock({
      "package.json": "hello there",
    });
    expect(() => matchVersion(`refs/tags/some-tag`)).to.throw(
      Error,
      "Unexpected token"
    );
  });
});
