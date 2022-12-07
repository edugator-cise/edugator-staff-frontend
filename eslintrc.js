module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest", "import"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "linebreak-style": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-empty-interface": "warn",
    "import/no-extraneous-dependencies": "warn",
    "@typescript-eslint/naming-convention": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "import/named": "warn",
    "@typescript-eslint/no-use-before-define": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "jest/no-identical-title": "warn",
    "@typescript-eslint/ban-types": "warn",
    "prefer-const": "warn",
    "@typescript-eslint/lines-between-class-members": "warn",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "import/namespace": "warn",
  },
};
