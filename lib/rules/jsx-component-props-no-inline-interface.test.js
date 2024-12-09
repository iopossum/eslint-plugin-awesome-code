const { RuleTester } = require("eslint");
const rule = require("./jsx-component-props-no-inline-interface");

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

ruleTester.run("jsx-component-props-no-inline-interface", rule, {
  valid: [
    "interface ITestProps {} const Test = (props: ITestProps) => { return null; }",
  ],
  invalid: [
    {
      code: "const Test = (props: {test: string}) => { return null; }",
      errors: [
        {
          messageId: "componentPropsNoInlineInterface",
        },
      ],
    },
  ],
});
