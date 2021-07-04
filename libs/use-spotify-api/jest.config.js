module.exports = {
  displayName: "use-spotify-api",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/use-spotify-api",
  setupFiles: ["./jest-setup.js"],
};
