const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/**', '.expo/**'],
    rules: {
      // Initial effects synchronize React with asynchronous Supabase state.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
