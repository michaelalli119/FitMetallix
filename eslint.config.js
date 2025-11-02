const reactNative = require('@react-native/eslint-config');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
  ...reactNative.configs.all,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __DEV__: 'readonly',
        window: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      // Customize rules as needed
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'no-console': 'warn',
      // Disable some overly strict rules
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
