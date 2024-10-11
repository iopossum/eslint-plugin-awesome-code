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

## Recommended

This plugin exports a `recommended` configuration that enforce React good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "extends": ["plugin:awesome-code/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

The rules enabled in this configuration are:

- [awesome-code/jsx-no-inline-function-as-prop](docs/rules/jsx-no-inline-function-as-prop.md)

## All

This plugin also exports an `all` configuration that includes every available rule.

```js
{
  "plugins": [
    "awesome-code"
  ],
  "extends": ["plugin:awesome-code/all"]
}
```

# License

eslint-plugin-awesome-code is licensed under the [MIT License](https://opensource.org/license/mit).
