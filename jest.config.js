/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/tests/**/*.test.ts"],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};

