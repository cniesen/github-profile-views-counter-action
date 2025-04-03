export default [
  {
    ignores: ["**/dist/"],
  },
  {
    languageOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-unused-vars": ["error", { caughtErrors: "none" }]
  },
}];