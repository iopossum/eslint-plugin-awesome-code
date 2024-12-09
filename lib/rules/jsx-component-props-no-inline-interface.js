"use strict";

const { createRule } = require("../utils/common");

module.exports = createRule({
  name: "jsx-component-props-no-inline-interface",
  meta: {
    type: "problem",
    docs: {
      description: "Prevent inline interface props as JSX component's props",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      componentPropsNoInlineInterface:
        "JSX component should not contain declared inline interface props",
    },
  },
  defaultOptions: [],
  create(context) {
    function reportError(node) {
      context.report({
        node,
        messageId: "componentPropsNoInlineInterface",
      });
    }

    return {
      "TSEmptyBodyFunctionExpression, FunctionExpression, ArrowFunctionExpression":
        (node) => {
          if (
            node.parent?.type === "VariableDeclarator" &&
            node.parent?.id?.name?.charAt(0) ===
              node.parent?.id?.name?.charAt(0).toUpperCase() &&
            node.params?.[0]?.typeAnnotation?.typeAnnotation?.type ===
              "TSTypeLiteral"
          ) {
            return reportError(node);
          }
          return true;
        },
    };
  },
});
