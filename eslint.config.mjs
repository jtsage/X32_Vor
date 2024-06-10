import js from '@eslint/js'
import babelParser from '@babel/eslint-parser'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

export default [
	js.configs.recommended,
	{
		files : ['**/*.js'],
		languageOptions : {
			ecmaVersion : 2022,
			
			globals     : {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
			parser      : babelParser,
			parserOptions : {
				requireConfigFile : false,
			},
			sourceType  : 'module',
		},
		plugins : {
			unicorn : eslintPluginUnicorn,
		},
		rules : {
			'comma-dangle' : [
				'error',
				{
					'arrays'    : 'only-multiline',
					'exports'   : 'never',
					'functions' : 'never',
					'imports'   : 'never',
					'objects'   : 'always-multiline',
				}
			],
			'indent' : [
				'error',
				'tab',
				{
					'SwitchCase' : 1,
				},
			],
			'key-spacing' : [
				'error',
				{
					'afterColon'  : true,
					'beforeColon' : true,
					'mode'        : 'minimum',
				},
			],
			'no-trailing-spaces' : [
				'error',
				{
					'ignoreComments' : true,
					'skipBlankLines' : true,
				},
			],
			'no-unused-vars' : [
				'error',
				{
					'args' : 'all',
					'argsIgnorePattern' : '^_',
					'varsIgnorePattern' : '^_|^client',
				},
			],
	
			'array-bracket-spacing'           : ['error', 'never'],
			'arrow-parens'                    : 'error',
			'comma-spacing'                   : 'error',
			'default-case'                    : 'error',
			'dot-notation'                    : 'error',
			'eqeqeq'                          : 'error',
			'func-call-spacing'               : 'error',
			'keyword-spacing'                 : 'error',
			'no-await-in-loop'                : 'error',
			'no-console'                      : 'warn',
			'no-duplicate-imports'            : 'error',
			'no-else-return'                  : 'error',
			'no-global-assign'                : 'error',
			'no-implicit-coercion'            : 'error',
			'no-implicit-globals'             : 'error',
			'no-lonely-if'                    : 'error',
			'no-multi-str'                    : 'error',
			'no-param-reassign'               : 'error',
			'no-promise-executor-return'      : 'error',
			'no-return-await'                 : 'error',
			'no-sequences'                    : 'error',
			'no-shadow'                       : 'error',
			'no-template-curly-in-string'     : 'error',
			'no-throw-literal'                : 'error',
			'no-unneeded-ternary'             : 'error',
			'no-unreachable-loop'             : 'error',
			'no-unused-expressions'           : 'error',
			'no-unused-private-class-members' : 'error',
			'no-useless-backreference'        : 'error',
			'no-useless-concat'               : 'error',
			'no-var'                          : 'error',
			'prefer-arrow-callback'           : 'error',
			'prefer-const'                    : 'error',
			'prefer-template'                 : 'error',
			'quotes'                          : ['error', 'single'],
			'require-atomic-updates'          : 'error',
			'semi'                            : ['error', 'never'],
	
			'complexity'                      : ['warn', 30],
			'sort-keys'                       : ['warn', 'asc', {'allowLineSeparatedGroups' : true, 'caseSensitive' : false, 'minKeys' : 4, 'natural' : true}],
	
			'unicorn/better-regex'                     : 'error',
			'unicorn/catch-error-name'                 : ['error', { 'name' : 'err' }],
			'unicorn/consistent-destructuring'         : 'error',
			'unicorn/consistent-function-scoping'      : 'error',
			'unicorn/empty-brace-spaces'               : 'error',
			'unicorn/error-message'                    : 'error',
			'unicorn/escape-case'                      : 'error',
			'unicorn/explicit-length-check'            : ['error', { 'non-zero' : 'not-equal' }],
			'unicorn/new-for-builtins'                 : 'error',
			'unicorn/no-abusive-eslint-disable'        : 'error',
			'unicorn/no-array-callback-reference'      : 'error',
			'unicorn/no-array-for-each'                : 'error',
			'unicorn/no-array-method-this-argument'    : 'error',
			'unicorn/no-array-push-push'               : 'error',
			'unicorn/no-for-loop'                      : 'error',
			'unicorn/no-lonely-if'                     : 'error',
			'unicorn/no-this-assignment'               : 'error',
			'unicorn/no-unnecessary-await'             : 'error',
			'unicorn/no-unused-properties'             : 'error',
			'unicorn/no-useless-length-check'          : 'error',
			'unicorn/no-useless-spread'                : 'error',
			'unicorn/no-useless-switch-case'           : 'error',
			'unicorn/prefer-array-some'                : 'error',
			'unicorn/prefer-json-parse-buffer'         : 'error',
			'unicorn/prefer-native-coercion-functions' : 'error',
			'unicorn/prefer-node-protocol'             : 'error',
			'unicorn/prefer-set-has'                   : 'error',
			'unicorn/prefer-spread'                    : 'error',
			'unicorn/require-array-join-separator'     : 'error',
			'unicorn/throw-new-error'                  : 'error',
		}
	}
]
