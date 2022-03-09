module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true
  },
  extends: ['plugin:react/jsx-runtime', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'import/no-unresolved': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  },

  plugins: ['react', 'prettier']
};
