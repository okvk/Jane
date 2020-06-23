module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  parser: "babel-eslint",
  plugins: ["react", "prettier"],
  rules: {
    "comma-dangle": ["error", "never"],
    "import/no-cycle": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "no-tabs": 0,
    "no-unused-vars": 1,
    "prefer-destructuring": 0,
    quotes: [2, "double", { avoidEscape: true }],
    "react/destructuring-assignment": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": 0,
    "react/no-string-refs": 0,
    "react/prop-types": 0,
    semi: ["error", "always"]
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src/"]]
      },
      node: {
        paths: ["src"]
      }
    }
  }
};
