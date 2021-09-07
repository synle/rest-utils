module.exports = {
  roots: ["<rootDir>"],
  testMatch: [
    "**/__tests__/**/*+(spec|test).+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "synle-rest-utils": "<rootDir>/index",
  },
  collectCoverage: true,
};
