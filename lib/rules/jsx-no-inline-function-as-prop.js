"use strict";

const { checkConstructor, createRule } = require("../utils/common");
const docsUrl = require("../utils/docs-url");

const config = {
  description: "Prevent `inline function` as JSX prop value",
  errorMessage: "JSX attribute values should not contain inline functions",
  url: docsUrl("jsx-no-inline-function-as-prop"),
};

module.exports = createRule(config, function (node) {
  if (
    (node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression" ||
      checkConstructor(node, "Function")) &&
    node.parent.type === "JSXExpressionContainer"
  ) {
    return true;
  }

  return false;
});
