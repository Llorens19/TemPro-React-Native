import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': ts,
      'react': reactPlugin,
      'react-hooks': reactHooks,
      'react-native': reactNative
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Basic rules
      'indent': ['error', 2], // Enforce 2-space indentation
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Require semicolons
      'no-multiple-empty-lines': ['error', { max: 1 }], // No multiple enters

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn', // Warn when 'any' type is used
      '@typescript-eslint/explicit-function-return-type': 'warn', // Require explicit return types on functions
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Require explicit return and argument types on exported functions


      // Naming convention rules
      'camelcase': 'error', // Enforce camelCase naming convention
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow'
        }, // Enforce variable names to be camelCase, UPPER_CASE, or PascalCase; allow leading underscores
        {
          selector: 'function',
          format: ['camelCase']
        }, // Enforce function names to be camelCase
        {
          selector: 'typeLike',
          format: ['PascalCase']
        } // Enforce type-like names (classes, interfaces, etc.) to be PascalCase
      ],

      // React rules
      'react/jsx-uses-react': 'error', // Prevent React from being incorrectly marked as unused
      'react/jsx-uses-vars': 'error', // Prevent variables used in JSX from being incorrectly marked as unused
      'react-native/no-raw-text': 'off', // Allow raw text inside <Text> components in React Native

      // Function rules
      'prefer-arrow-callback': 'error', // Require using arrow functions for callbacks
      'arrow-body-style': ['error', 'as-needed'], // Require braces in arrow function body only when needed

      // Other rules
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn on console usage except for console.warn and console.error
      'react-hooks/rules-of-hooks': 'error', // Enforce the Rules of Hooks
      'react-hooks/exhaustive-deps': 'warn' // Warn about missing dependencies in useEffect and similar hooks
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];