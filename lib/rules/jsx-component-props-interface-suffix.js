"use strict";

const { createRule } = require("../utils/common");

module.exports = createRule({
  name: "jsx-component-props-interface-suffix",
  meta: {
    type: "problem",
    docs: {
      description:
        "JSX component props interface should be suffixed with `Props`",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      componentPropsInterfaceSuffix:
        "JSX component props interface should be suffixed with `Props`",
    },
  },
  defaultOptions: [],
  create(context) {
    function reportError(node) {
      context.report({
        node,
        messageId: "componentPropsInterfaceSuffix",
      });
    }

    function isSuffixedWithProps(name) {
      if (typeof name !== "string") {
        return false;
      }

      const minLength = "Props".length + 1;

      return name.length >= minLength && name.endsWith("Props");
    }

    return {
      "TSEmptyBodyFunctionExpression, FunctionExpression, ArrowFunctionExpression":
        (node) => {
          if (
            node.parent?.type === "VariableDeclarator" &&
            node.parent?.id?.name?.charAt(0) ===
              node.parent?.id?.name?.charAt(0).toUpperCase() &&
            node.params?.[0]?.typeAnnotation?.typeAnnotation?.type ===
              "TSTypeReference" &&
            !isSuffixedWithProps(
              node.params?.[0]?.typeAnnotation?.typeAnnotation?.typeName?.name
            )
          ) {
            return reportError(node);
          }
          return true;
        },
    };
  },
});
