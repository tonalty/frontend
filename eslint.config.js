import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  Object.assign({}, pluginReactConfig, {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // bare imports,
            ['^react', '^'], // react, non-local imports
            ['^@/', '^\\.'] // local imports
          ]
        }
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error'
    }
  })
];
