const { RuleTester } = require("eslint");
const rule = require("./jsx-component-props-interface-suffix");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions,
    parser: require("@typescript-eslint/parser"),
  },
});

ruleTester.run("jsx-component-props-interface-suffix", rule, {
  valid: [
    "interface ITestProps {} const Test = (props: ITestProps) => { return null; }",
  ],
  invalid: [
    {
      code: "interface ITest {} const Test = (props: ITest) => { return null; }",
      errors: [
        {
          messageId: "componentPropsInterfaceSuffix",
        },
      ],
    },
  ],
});
