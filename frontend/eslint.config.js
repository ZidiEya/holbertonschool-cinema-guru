// Importe la configuration de base ESLint pour JavaScript
import js from '@eslint/js'

// Importe une collection de variables globales reconnues pour différents environnements (ex: browser, node)
import globals from 'globals'

// Importe le plugin ESLint pour appliquer les règles liées aux Hooks React
import reactHooks from 'eslint-plugin-react-hooks'

// Importe le plugin ESLint pour supporter React Refresh (Hot Module Replacement)
import reactRefresh from 'eslint-plugin-react-refresh'

// Importe des outils utilitaires pour définir une configuration ESLint moderne (supporte `defineConfig`)
import { defineConfig, globalIgnores } from 'eslint/config'


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
