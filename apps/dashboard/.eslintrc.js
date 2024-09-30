module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/next"
  ],
  parserOptions: {
    project: true,
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
