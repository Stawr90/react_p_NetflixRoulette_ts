export default {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'project': 'tsconfig.json',
		'tsconfigRootDir': __dirname,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint/eslint-plugin',
		'react'
	],
	'rules': {
		'indent': 'off',
		'linebreak-style': [
			'warn',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': 'off'
	}
};
