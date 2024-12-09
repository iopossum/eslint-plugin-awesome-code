const { RuleTester } = require("eslint");
const rule = require("./jsx-no-inline-function-as-prop");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ languageOptions: { parserOptions } });

ruleTester.run("jsx-no-inline-function-as-prop", rule, {
  valid: [
    "const Test = () => { const fn = () => {}; return <button onClick={fn}>test</button> }",
  ],
  invalid: [
    {
      code: "const Test = () => { return <button onClick={() => {}}>test</button> }",
      errors: [
        {
          messageId: "noInlineFunctionAsProp",
        },
      ],
    },
  ],
});
