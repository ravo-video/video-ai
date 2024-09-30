const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'next',
    'turbo',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
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
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
    react: {
      version: 'detect',
    },
    next: {
      rootDir: ['.'],
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'off',
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
