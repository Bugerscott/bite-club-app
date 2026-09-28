const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ['dist/*', 'debug-backups/**', '.expo/**'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      // React Compiler's generic immutability/ref rules currently flag valid
      // React Native/Reanimated patterns (SharedValue.value and stable callback refs).
      // Runtime/type safety for these paths is still covered by TypeScript and Expo Doctor.
      'react-hooks/immutability': 'off',
      'react-hooks/refs': 'off',
    },
  },
]);
