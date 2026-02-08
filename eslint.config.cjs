const {
	defineConfig,
} = require("eslint/config");

const globals = require("globals");

module.exports = defineConfig([{
	languageOptions: {
		globals: {
			...globals.node,
		},

		"ecmaVersion": "latest",
		"sourceType": "module",
		parserOptions: {},
	},

	"rules": {
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
	},
}, {
	languageOptions: {
		globals: {
			...globals.node,
		},

		"sourceType": "script",
		parserOptions: {},
	},

	files: ["**/.eslintrc.{js,cjs}"],
}]);
