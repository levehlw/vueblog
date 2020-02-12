module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 0,
    'no-unused-expressions': 0,
    'no-labels': 0,
    indent: 0,
    'vue/no-unused-vars': 0,
    'padded-blocks': 0,
    'no-multiple-empty-lines': 0,
    'vue/no-async-in-computed-properties': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/no-duplicate-attributes': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
