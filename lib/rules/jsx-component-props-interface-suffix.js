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
      TSTypeParameterInstantiation(node) {
        if (node.parent?.typeName?.name === "FC") {
          if (
            !node.params?.[0]?.typeArguments &&
            !isSuffixedWithProps(node.params?.[0]?.typeName.name)
          ) {
            return reportError(node);
          }
        }
      },
      TSQualifiedName(node) {
        if (
          node.left?.name === "React" &&
          node.right?.name === "FC" &&
          node.parent?.typeArguments
        ) {
          if (
            !node.parent.typeArguments.params?.[0]?.typeName?.typeArguments &&
            !isSuffixedWithProps(
              node.parent.typeArguments.params?.[0]?.typeName.name
            )
          ) {
            return reportError(node);
          }
        }
      },
      'Identifier, ObjectPattern': (node) => {
        if (
          [
            "TSEmptyBodyFunctionExpression",
            "FunctionExpression",
            "ArrowFunctionExpression",
          ].includes(node.parent.type)
        ) {
          if (
            node.parent?.parent?.type === "VariableDeclarator" &&
            node.parent?.parent?.id?.name?.charAt(0) ===
              node.parent?.parent?.id?.name?.charAt(0).toUpperCase() &&
            (!!node.typeAnnotation?.typeAnnotation?.typeName ||
              node.typeAnnotation?.typeAnnotation?.type ===
                "TSIntersectionType") &&
            !node.typeAnnotation?.typeAnnotation?.typeArguments &&
            !isSuffixedWithProps(
              node.typeAnnotation?.typeAnnotation?.typeName?.name
            )
          ) {
            return reportError(node);
          }
        }
      },
    };
  },
});
