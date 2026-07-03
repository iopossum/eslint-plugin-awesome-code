const { RuleTester } = require("eslint");
const rule = require("./jsx-no-inline-function-as-prop");

const parserOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ languageOptions: { parserOptions } });

ruleTester.run("jsx-no-inline-function-as-prop", rule, {
  valid: [
    "const Test = () => { const fn = () => {}; return <button onClick={fn}>test</button> }",
    "const Test = () => <button onClick={undefined}>test</button>",
    "const Test = () => <button onClick={null}>test</button>",
    "const Test = () => <button onClick={someVar}>test</button>",
    "const Test = () => <button onClick={condition ? null : undefined}>test</button>",
    "const Test = () => <button onClick={1}>test</button>",
    "const Test = () => <button onClick={'str'}>test</button>",
  ],
  invalid: [
    {
      code: "const Test = () => { return <button onClick={() => {}}>test</button> }",
      errors: [{ messageId: "noInlineFunctionAsProp" }],
    },
    {
      code: "const Test = () => <button onClick={function() {}}>test</button>",
      errors: [{ messageId: "noInlineFunctionAsProp" }],
    },
    {
      code: "const Test = () => <button onClick={condition ? () => {} : null}>test</button>",
      errors: [{ messageId: "noInlineFunctionAsProp" }],
    },
    {
      code: "const Test = () => <button onClick={condition && (() => {})}>test</button>",
      errors: [{ messageId: "noInlineFunctionAsProp" }],
    },
  ],
});
