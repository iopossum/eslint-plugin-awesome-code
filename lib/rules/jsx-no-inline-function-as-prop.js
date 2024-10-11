"use strict";

const { checkConstructor, createRule } = require("../utils");

module.exports = createRule(
  "Prevent `inline function` as JSX prop value",
  "JSX attribute values should not contain inline functions",
  function (node) {
    if (
      (node.type === "FunctionExpression" ||
        node.type === "ArrowFunctionExpression" ||
        checkConstructor(node, "Function")) &&
      node.parent.type === "JSXExpressionContainer"
    ) {
      return true;
    }

    return false;
  }
);
