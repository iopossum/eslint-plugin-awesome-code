"use strict";

const {
  checkConstructor,
  findRelevantNodes,
  createRule,
} = require("../utils/common");

module.exports = createRule({
  name: "jsx-no-inline-function-as-prop",
  meta: {
    type: "problem",
    docs: {
      description: "Prevent `inline function` as JSX prop value",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      noInlineFunctionAsProp:
        "JSX attribute values should not contain inline functions",
    },
    schema: [
      {
        additionalProperties: false,
        properties: {},
        type: "object",
      },
    ],
  },
  defaultOptions: [],
  create(context) {
    function reportError(node) {
      context.report({
        node,
        messageId: "noInlineFunctionAsProp",
      });
    }

    return {
      JSXAttribute: function (node) {
        if (!node.value || node.value.type !== "JSXExpressionContainer") {
          return;
        }

        var violationFound = false;
        findRelevantNodes(context, node.value.expression).forEach(function (
          node
        ) {
          if (isViolation(node)) {
            violationFound = true;
            reportError(node);
          }
        });
        return violationFound;
      },
    };
  },
});

const isViolation = (node) => {
  if (
    (node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression" ||
      checkConstructor(node, "Function")) &&
    node.parent.type === "JSXExpressionContainer"
  ) {
    return true;
  }

  return false;
};
