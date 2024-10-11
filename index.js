"use strict";

var allRules = {
  "jsx-no-inline-function-as-prop": require("./lib/rules/jsx-no-inline-function-as-prop"),  
};

function configureAsError(rules) {
  var result = {};
  for (var key in rules) {
    if (!rules.hasOwnProperty(key)) {
      continue;
    }
    result["awesome-code/" + key] = 2;
  }
  return result;
}

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugins: ["awesome-code"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "awesome-code/jsx-no-inline-function-as-prop": 2
      }
    },
    all: {
      plugins: ["awesome-code"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: configureAsError(allRules)
    }
  }
};