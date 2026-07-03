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
    node.type === "FunctionExpression" ||
    node.type === "ArrowFunctionExpression" ||
    checkConstructor(node, "Function")
  ) {
    // Traverse up the parent chain to check if we're directly inside JSXExpressionContainer
    // This handles cases like: <button onClick={condition ? () => {} : null}>
    var parent = node.parent;
    while (parent) {
      if (parent.type === "JSXExpressionContainer") {
        return true;
      }
      // Stop at JSX boundary, function boundary, or program root
      if (
        parent.type === "JSXAttribute" ||
        parent.type === "JSXElement" ||
        parent.type === "JSXFragment" ||
        parent.type === "FunctionDeclaration" ||
        parent.type === "FunctionExpression" ||
        parent.type === "ArrowFunctionExpression" ||
        parent.type === "Program"
      ) {
        break;
      }
      parent = parent.parent;
    }
  }

  return false;
};
