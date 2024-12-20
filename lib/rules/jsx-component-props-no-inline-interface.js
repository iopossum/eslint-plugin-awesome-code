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
      TSTypeParameterInstantiation(node) {
        if (node.parent?.typeName?.name === "FC") {
          if (
            node.params?.[0]?.type === "TSTypeLiteral" ||
            (node.params?.[0]?.type === "TSIntersectionType" &&
              node.params?.[0]?.types.some((v) => v.type === "TSTypeLiteral"))
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
            node.parent?.typeArguments?.params?.[0]?.type === "TSTypeLiteral" ||
            (node.parent?.typeArguments?.params?.[0]?.type ===
              "TSIntersectionType" &&
              node.parent?.typeArguments?.params?.[0]?.types.some(
                (v) => v.type === "TSTypeLiteral"
              ))
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
            (node.typeAnnotation?.typeAnnotation?.type === "TSTypeLiteral" ||
              (node.typeAnnotation?.typeAnnotation?.type ===
                "TSIntersectionType" &&
                node.typeAnnotation?.typeAnnotation?.types.some(
                  (v) => v.type === "TSTypeLiteral"
                )))
          ) {
            return reportError(node);
          }
        }
      },
    };
  },
});
