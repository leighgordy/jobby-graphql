// eslint-disable-next-line no-undef
module.exports = {
  plugins: ['jest'],
  env: {
    amd: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ]
  }
};
