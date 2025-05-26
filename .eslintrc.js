module.exports = {
  root: true,
  extends: [
    '@react-native',
  ],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    __DEV__: 'readonly',
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
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    'build/',
    '*.config.js',
    '*.config.ts',
  ],
};