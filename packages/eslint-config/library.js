const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['turbo', 'eslint-config-prettier', 'plugin:prettier/recommended'],
  plugins: [
    'eslint-comments',
    'only-warn',
    'simple-import-sort',
    'react',
    'react-hooks',
    'prettier',
    'jest',
  ],
  globals: {
    JSX: true,
  },
  env: {
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        plugins: ['prettier-plugin-tailwindcss'],
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'all',
        useTabs: false,
        tabWidth: 2,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      parser: '@babel/eslint-parser',
      plugins: ['ft-flow'],
      rules: {
        // Flow Plugin
        // The following rules are made available via `eslint-plugin-ft-flow`
        'ft-flow/define-flow-type': 1,
        'ft-flow/use-flow-type': 1,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
          },
        ],
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 1,
        'no-undef': 'off',
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': 1,
      },
    },
    {
      files: [
        '*.{spec,test}.{js,ts,tsx}',
        '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
      ],
      env: {
        jest: true,
      },
      rules: {
        'react-native/no-inline-styles': 0,
        quotes: [
          1,
          'single',
          { avoidEscape: true, allowTemplateLiterals: true },
        ],
      },
    },
  ],
};
