# eslint-plugin-awesome-code


# Installation

```sh
$ npm i eslint-plugin-awesome-code
```

Add `plugins` section and specify eslint-plugin-awesome-code as a plugin.

```json
{
  "plugins": ["awesome-code"]
}
```

# List of supported rules

- [awesome-code/jsx-no-inline-function-as-prop](docs/rules/jsx-no-inline-function-as-prop.md): Prevent `inline function` as JSX prop value
- [awesome-code/jsx-component-props-interface-suffix](docs/rules/jsx-component-props-interface-suffix.md): JSX component props interface should be suffixed with `Props`
- [awesome-code/jsx-component-props-no-inline-interface](docs/rules/jsx-component-props-no-inline-interface.md): Prevent inline interface props as JSX component's props


## Recommended

This plugin exports a `recommended` configuration that enforce React good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "extends": ["plugin:awesome-code/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

## Recommended All

This plugin also exports an `all` configuration that includes every available rule and some external rules.

```js
{  
  "extends": ["plugin:awesome-code/recommended-all"]
}
```
List of included plugins:

- [eslint-plugin-no-inline-styles](https://www.npmjs.com/package/eslint-plugin-no-inline-styles)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) recommended & jsx-runtime configs & config below:
```js
{  
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
}
```
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [@eslint/js](https://eslint.org/docs/latest/use/getting-started) recommended config & config below:
```js
{  
  "max-params": ["error", 3],
  "no-undef": 1,
  "no-console": 1,  
  "no-debugger": 1,
  "no-unused-vars": 0, //the copy of the same rule in @typescript-eslint/eslint-recommended
  "no-const-assign": 1,
  "no-eval": 1,
  "no-empty": [2, { allowEmptyCatch: true }],
  "no-var": 1,
  "require-await": 0,
}
```
- [typescript-eslint](https://typescript-eslint.io/users/configs#recommended) recommended config & config below:
```js
{  
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
}
```
# License

eslint-plugin-awesome-code is licensed under the [MIT License](https://opensource.org/license/mit).
