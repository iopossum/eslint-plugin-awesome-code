"use strict";
const eslintVersion = require('eslint/package.json').version; 

var isLegacyVarsion = eslintVersion.charAt(0) < 9;

if (isLegacyVarsion) {
  // Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
  require("@rushstack/eslint-patch/modern-module-resolution");
}

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
    plugins: plugins.concat([
      "eslint-plugin-no-inline-styles",
      "@typescript-eslint",
      "jsx-a11y",
    ]),
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:import-x/recommended",
      "plugin:import-x/typescript",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
    ],
    overrides: [
      {
        files: ["**/*.ts?(x)"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
          // typescript-eslint specific options
          warnOnUnsupportedTypeScriptVersion: true,
        },
        plugins: ["@typescript-eslint"],
        // If adding a typescript-eslint version of an existing ESLint rule,
        // make sure to disable the ESLint rule here.
        rules: {
          // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
          "default-case": "off",
          // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
          "no-dupe-class-members": "off",
          // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
          "no-undef": "off",

          // Add TypeScript specific rules (and turn off ESLint equivalents)
          "@typescript-eslint/consistent-type-assertions": "warn",
          "no-array-constructor": "off",
          "@typescript-eslint/no-array-constructor": "warn",
          "no-redeclare": "off",
          "@typescript-eslint/no-redeclare": "warn",
          "no-use-before-define": "off",
          "@typescript-eslint/no-use-before-define": [
            "warn",
            {
              functions: false,
              classes: false,
              variables: false,
              typedefs: false,
            },
          ],
          "no-unused-expressions": "off",
          "@typescript-eslint/no-unused-expressions": [
            "error",
            {
              allowShortCircuit: true,
              allowTernary: true,
              allowTaggedTemplates: true,
            },
          ],
          "no-unused-vars": "off",
          "@typescript-eslint/no-unused-vars": [
            1,
            {
              vars: "all",
              args: "after-used",
              caughtErrors: "none",
              ignoreRestSiblings: true,
            },
          ],
          "no-useless-constructor": "off",
          "@typescript-eslint/no-useless-constructor": "warn",
        },
      },
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...configureAsWarning(allRules),

      //http://eslint.org/docs/rules/
      "array-callback-return": "warn",
      "default-case": ["warn", { commentPattern: "^no default$" }],
      "dot-location": ["warn", "property"],
      eqeqeq: ["warn", "smart"],
      "new-parens": "warn",
      "no-array-constructor": "warn",
      "no-caller": "warn",
      "no-cond-assign": ["warn", "except-parens"],
      "no-control-regex": "warn",
      "no-delete-var": "warn",
      "no-dupe-args": "warn",
      "no-dupe-class-members": "warn",
      "no-dupe-keys": "warn",
      "no-duplicate-case": "warn",
      "no-empty-character-class": "warn",
      "no-empty-pattern": "warn",
      "no-ex-assign": "warn",
      "no-extend-native": "warn",
      "no-extra-bind": "warn",
      "no-extra-label": "warn",
      "no-fallthrough": "warn",
      "no-func-assign": "warn",
      "no-implied-eval": "warn",
      "no-invalid-regexp": "warn",
      "no-iterator": "warn",
      "no-label-var": "warn",
      "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
      "no-lone-blocks": "warn",
      "no-loop-func": "warn",
      "no-mixed-operators": [
        "warn",
        {
          groups: [
            ["&", "|", "^", "~", "<<", ">>", ">>>"],
            ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
            ["&&", "||"],
            ["in", "instanceof"],
          ],
          allowSamePrecedence: false,
        },
      ],
      "no-multi-str": "warn",
      "no-global-assign": "warn",
      "no-unsafe-negation": "warn",
      "no-new-func": "warn",
      "no-new-object": "warn",
      "no-new-symbol": "warn",
      "no-new-wrappers": "warn",
      "no-obj-calls": "warn",
      "no-octal": "warn",
      "no-octal-escape": "warn",
      "no-redeclare": "warn",
      "no-regex-spaces": "warn",
      "no-restricted-syntax": ["warn", "WithStatement"],
      "no-script-url": "warn",
      "no-self-assign": "warn",
      "no-self-compare": "warn",
      "no-sequences": "warn",
      "no-shadow-restricted-names": "warn",
      "no-sparse-arrays": "warn",
      "no-template-curly-in-string": "warn",
      "no-this-before-super": "warn",
      "no-throw-literal": "warn",
      "no-unreachable": "warn",
      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "no-unused-labels": "warn",
      "no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: false,
          variables: false,
        },
      ],
      "no-useless-computed-key": "warn",
      "no-useless-concat": "warn",
      "no-useless-constructor": "warn",
      "no-useless-escape": "warn",
      "no-useless-rename": [
        "warn",
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      "no-with": "warn",
      "no-whitespace-before-property": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "require-yield": "warn",
      "rest-spread-spacing": ["warn", "never"],
      strict: ["warn", "never"],
      "unicode-bom": ["warn", "never"],
      "use-isnan": "warn",
      "valid-typeof": "warn",
      "getter-return": "warn",
      "max-params": [2, 3],
      "no-undef": 2,
      "no-console": 1,
      "no-debugger": 1,
      "no-unused-vars": 1,
      "no-const-assign": 2,
      "no-eval": 1,
      "no-empty": [1, { allowEmptyCatch: true }],
      "no-var": 1,
      "require-await": 0,

      //@typescript-eslint/eslint-plugin
      "@typescript-eslint/no-require-imports": 0,
      "@typescript-eslint/no-explicit-any": 1,
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/naming-convention": [
        1,

        {
          selector: "variable",
          format: ["StrictPascalCase"],
          filter: { regex: "Context$", match: true },
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          filter: { regex: "^_VERSION_$", match: false },
        },

        {
          selector: "parameter",
          format: ["camelCase"],
          filter: { regex: "^_$", match: false },
        },

        { selector: "enum", format: ["PascalCase"], prefix: ["E"] },
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },

        { selector: "typeAlias", format: ["PascalCase"], prefix: ["T"] },
        { selector: "typeParameter", format: ["PascalCase"] },

        { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
      ],
      "@typescript-eslint/consistent-type-definitions": [1, "interface"],

      //https://github.com/antfu/eslint-plugin-import-x
      "import-x/first": "error",
      "import-x/no-amd": "error",
      "import-x/no-webpack-loader-syntax": "error",
      "import-x/no-named-as-default": 0,
      "import-x/no-anonymous-default-export": 1,
      "import-x/no-named-as-default-member": 1,

      //https://github.com/nmanthena18/eslint-no-inline-styles
      "no-inline-styles/no-inline-styles": 1,

      //https://github.com/jsx-eslint/eslint-plugin-react
      "react/forbid-foreign-prop-types": ["warn", { allowInPropTypes: true }],
      "react/jsx-no-comment-textnodes": "warn",
      "react/jsx-no-duplicate-props": "warn",
      "react/jsx-no-target-blank": "warn",
      "react/jsx-no-undef": "error",
      "react/jsx-pascal-case": [
        "warn",
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      "react/no-danger-with-children": "warn",
      "react/no-direct-mutation-state": "warn",
      "react/no-is-mounted": "warn",
      "react/no-typos": "error",
      "react/require-render-return": "error",
      "react/style-prop-object": "warn",
      "react/display-name": 0,
      "react/prop-types": 0,
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
      "react/jsx-max-depth": [1, { max: 6 }],

      // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
      "react-hooks/rules-of-hooks": "error",

      //https://github.com/prettier/eslint-plugin-prettier
      "prettier/prettier": [
        1,
        {
          endOfLine: "auto",
        },
      ],

      // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          aspects: ["noHref", "invalidHref"],
        },
      ],
      "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-role": ["warn", { ignoreNonDOM: true }],
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/iframe-has-title": "warn",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/no-distracting-elements": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "jsx-a11y/scope": "warn",
    },
  },
};

const plugin = {
  rules: allRules,
  configs,
};

if (!isLegacyVarsion) {
  const reactPlugin = require("eslint-plugin-react");
  const reactHooksPlugin = require("eslint-plugin-react-hooks");
  const noInlineStylesPlugin = require("eslint-plugin-no-inline-styles");
  const jsxAllyPlugin = require("eslint-plugin-jsx-a11y");
  const eslintJs = require("@eslint/js");
  const tsEslint = require("typescript-eslint");
  const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
  const eslintPluginImportX = require('eslint-plugin-import-x');

  configs.flat = {
    recommended: {
      plugins: { [PLUGIN_NAME]: plugin },
      rules: configs.recommended.rules,
      languageOptions: { parserOptions: configs.recommended.parserOptions },
    },
    "recommended-all": tsEslint.config(
      eslintPluginPrettierRecommended,
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginImportX.flatConfigs.typescript,
      eslintJs.configs.recommended,
      tsEslint.configs.recommended,
      {
        plugins: {
          [PLUGIN_NAME]: plugin,
          react: reactPlugin,
          "no-inline-styles": noInlineStylesPlugin,
          "react-hooks": reactHooksPlugin,
          "jsx-a11y": jsxAllyPlugin
        },
        rules: {
          ...reactPlugin.configs.flat.recommended.rules,
          ...reactPlugin.configs.flat["jsx-runtime"].rules,
          ...reactHooksPlugin.configs.recommended.rules,
          ...configs["recommended-all"].rules,
        },
        languageOptions: {
          parserOptions: configs["recommended-all"].parserOptions,
        },
      },
      configs["recommended-all"].overrides.map(v => ({
        files: v.files,
        rules: v.rules
      }))
    ),
  };
}

module.exports = plugin;
