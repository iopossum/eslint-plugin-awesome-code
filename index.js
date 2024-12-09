"use strict";
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const noInlineStylesPlugin = require("eslint-plugin-no-inline-styles");
const eslintJs = require("@eslint/js");
const tsEslint = require('typescript-eslint');

var allRules = {
  "jsx-no-inline-function-as-prop": require("./lib/rules/jsx-no-inline-function-as-prop"),
  "jsx-component-props-interface-suffix": require("./lib/rules/jsx-component-props-interface-suffix"),
  "jsx-component-props-no-inline-interface": require("./lib/rules/jsx-component-props-no-inline-interface"),
};

const PLUGIN_NAME = "awesome-code";

function configureAsWarning(rules) {
  var result = {};
  for (var key in rules) {
    if (!rules.hasOwnProperty(key)) {
      continue;
    }
    result[PLUGIN_NAME + "/" + key] = 1;
  }
  return result;
}

const plugins = [PLUGIN_NAME];

const configs = {
  recommended: {
    plugins,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: configureAsWarning(allRules),
  },
  "recommended-all": {
    parser: "@typescript-eslint/parser",
    plugins: plugins.concat(["eslint-plugin-no-inline-styles", "@typescript-eslint"]),
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/eslint-recommended"
    ],
    rules: {
      ...configureAsWarning(allRules),
      //@eslint/js
      "max-params": [1, 3],
      "no-undef": 1,
      "no-console": 1,      
      "no-debugger": 1,
      "no-unused-vars": 0, //the copy of the same rule in @typescript-eslint/eslint-recommended
      "no-const-assign": 1,
      "no-eval": 1,
      "no-empty": [1, { allowEmptyCatch: true }],
      "no-var": 1,
      "require-await": 0,
      //eslint-plugin-no-inline-styles
      "no-inline-styles/no-inline-styles": 1,
      //eslint-plugin-react
      "react/jsx-key": [1, { checkFragmentShorthand: true }],
      "react/jsx-handler-names": [
        1,
        {
          checkLocalVariables: true,
          checkInlineFunction: true,
        },
      ],
      "react/jsx-no-constructed-context-values": 1,
      "react/jsx-no-leaked-render": 1,
      "react/jsx-no-useless-fragment": 1,
      "react/jsx-pascal-case": 1,
      "react/jsx-max-depth": [1, { max: 6 }],
      //@typescript-eslint/eslint-plugin
      "@typescript-eslint/no-unused-vars": [1, { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
      "@typescript-eslint/no-explicit-any": 1,
      "@typescript-eslint/naming-convention": [
        1,

        { "selector": "variable", "format": ["StrictPascalCase"], "filter": { "regex": "Context$", "match": true } },
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"],
          "filter": { "regex": "^_VERSION_$", "match": false }
        },

        { "selector": "parameter", "format": ["camelCase"], "filter": { "regex": "^_$", "match": false } },

        { "selector": "enum", "format": ["PascalCase"], "prefix": ["E"] },
        { "selector": "enumMember", "format": ["UPPER_CASE"] },

        { "selector": "typeAlias", "format": ["PascalCase"], "prefix": ["T"] },
        { "selector": "typeParameter", "format": ["PascalCase"] },

        { "selector": "interface", "format": ["PascalCase"], "prefix": ["I"] }
      ],
      "@typescript-eslint/consistent-type-definitions": [1, "interface"],
    },
  },
};

const plugin = {
  rules: allRules,
  configs,
};

configs.flat = {
  recommended: {
    plugins: { [PLUGIN_NAME]: plugin },
    rules: configs.recommended.rules,
    languageOptions: { parserOptions: configs.recommended.parserOptions },
  },
  "recommended-all": {
    plugins: {
      [PLUGIN_NAME]: plugin,
      ...reactPlugin.configs.flat.recommended,
      ...reactPlugin.configs.flat["jsx-runtime"],
      ...noInlineStylesPlugin,
      ...reactHooksPlugin,      
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      ...configs["recommended-all"].rules,      
    },
    languageOptions: {
      parserOptions: configs["recommended-all"].parserOptions,
    },
  },
};

module.exports = plugin;
