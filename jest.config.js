/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset:'ts-jest',
  testMatch: ["**/tests/**/*.test.ts"],
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};

