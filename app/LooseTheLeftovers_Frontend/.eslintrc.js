module.exports = {
  root: true,
  extends: [
    '@react-native-community', // The React Native ESLint configuration
    'prettier', // Turns off all rules that are unnecessary or might conflict with Prettier
    'prettier/react', // Turns off rules that conflict with Prettier in .jsx files
  ],
  rules: {
    semi: ['error', 'never'], // Don't use semicolons
    'comma-dangle': ['error', 'always-multiline'], // Always multiline comma dangle
  },
};
