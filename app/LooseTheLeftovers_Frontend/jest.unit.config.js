const baseConfig = require('./jest.config.js');

module.exports = {
  ...baseConfig,
  // link to setup file
  setupFiles: ['./jest/unit.setup.js'],
  // run tests with test.tsx in __tests__/unit 
  testMatch: ['**/__tests__/unit/**/*.test.tsx']
  // Integration test specific configurations...
};