const matchVersion = require("./match-version");
const mock = require("mock-fs");
const core = require("@actions/core");

jest.mock("@actions/core", () => ({
  info: jest.fn(),
  setOutput: jest.fn(),
}));

describe("matchVersion", () => {
  afterEach(() => {
    mock.restore();
  });

  describe(" when tag and version match", () => {
    const version = "0.0.0";
    beforeEach(() => {
      mock({
        "package.json": JSON.stringify({ version }),
      });
    });

    it("should not throw an error", () => {
      matchVersion(`refs/tags/${version}`);
    });

    it("should output the package version", () => {
      matchVersion(`refs/tags/${version}`);
      expect(core.setOutput).toHaveBeenCalledWith("PACKAGE_VERSION", version);
    });

    it("should output the tag version", () => {
      matchVersion(`refs/tags/${version}`);
      expect(core.setOutput).toHaveBeenCalledWith("TAG_VERSION", version);
    });
  });

  it("should throw an error when not on ref tag", () => {
    const version = "0.0.0";
    mock({
      "package.json": JSON.stringify({ version }),
    });

    expect(() => matchVersion("refs/heads/master")).toThrow(Error, "not tagged");
  });

  it("should throw an error there is no package.json present", () => {
    mock({});
    expect(() => matchVersion(`refs/tags/some-tag`)).toThrow(
      /no such file or directory/
    );
  });

  it("should throw an error when package.json is malformed", () => {
    mock({
      "package.json": "hello there",
    });
    expect(() => matchVersion(`refs/tags/some-tag`)).toThrow(
      Error,
      "Unexpected token"
    );
  });

  it("should not throw error when versions match with provided prefix", () => {
    const prefix = "v";
    const version = "0.0.0";
    mock({
      "package.json": JSON.stringify({ version }),
    });

    matchVersion(`refs/tags/${prefix}${version}`, prefix);
  });
});
