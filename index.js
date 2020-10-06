const yaml = require('js-yaml')
const fs = require('fs')
const { get } = require('lodash')

function loadConfig(base) {
  if (fs.existsSync(base)) {
    return JSON.parse(fs.readFileSync(base, 'utf8'))
  }
  if (fs.existsSync(`${base}.yml`)) {
    return yaml.safeLoad(fs.readFileSync(`${base}.yml`, 'utf8'))
  }
  return {}
}

const ccProject = get(loadConfig('.codeclimate'), 'checks', {})
function gcc(path, def) {
  if (get(ccProject, `${path}.enabled`, false)) {
    return get(ccProject, `${path}.config.threshold`, def)
  }
  return def
}

const prettierProject = loadConfig('.prettierrc')

const config = {
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
    },
  ],
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    // 'functional',
    'jest',
    'prettier',
    'sonarjs',
    // 'tsdoc',
    'unicorn',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/member-ordering': 'error',
    // '@typescript-eslint/naming-convention': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    // '@typescript-eslint/no-magic-numbers': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    'class-methods-use-this': 'error',
    'eslint-comments/disable-enable-pair': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    // 'functional/immutable-data': 'error',
    'jest/no-commented-out-tests': 'error',
    'jest/no-disabled-tests': 'error',
    'max-depth': 'error',
    // 'max-lines-per-function': 'error',
    // 'max-nested-callbacks': 'error',
    // 'max-params': 'error',
    // 'max-statements': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-empty-function': 'error',
    'no-empty-pattern': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-lone-blocks': 'error',
    // 'no-magic-numbers': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'prettier/prettier': 'error',
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/max-switch-cases': 'error',
    'sonarjs/no-all-duplicated-branches': 'error',
    'sonarjs/no-duplicate-string': 'error',
    'sonarjs/no-duplicated-branches': 'error',
    'sonarjs/no-element-overwrite': 'error',
    'sonarjs/no-extra-arguments': 'error',
    'sonarjs/no-identical-conditions': 'error',
    'sonarjs/no-identical-expressions': 'error',
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-inverted-boolean-check': 'error',
    'sonarjs/no-one-iteration-loop': 'error',
    'sonarjs/no-redundant-boolean': 'error',
    'sonarjs/no-redundant-jump': 'error',
    'sonarjs/no-unused-collection': 'error',
    'sonarjs/no-useless-catch': 'error',
    // 'tsdoc/syntax': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-unused-properties': 'error',
    // complexity: 'error',

    '@typescript-eslint/no-explicit-any': 'off',

    'max-len': [
      'error',
      {
        code: get(prettierProject, 'printWidth', 160),
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],

    // code-climate
    'max-params': ['error', gcc('argument-count', 4)],
    complexity: ['error', gcc('complex-logic', 4)],
    'max-lines': [
      'error',
      { max: gcc('file-lines', 250), skipComments: true, skipBlankLines: true },
    ],
    // method-complexity: 5
    'max-lines-per-function': [
      'error',
      {
        max: gcc('method-lines', 25),
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    // ['error', gcc('method-count', 20)]
    'max-nested-callbacks': ['error', gcc('nested-control-flow', 4)],
    // return-statements, 4
  },
}

module.exports = config
