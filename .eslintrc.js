module.exports = {
  plugins: ["@typescript-eslint"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json"
  },
  extends: [
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "plugin:vue/recommended",
    require.resolve("eslint-config-prettier/vue")
  ],
  rules: {}
};
