const {
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  override
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // less loader
  addLessLoader({
    javascriptEnabled: true
    // customizing antd
    // modifyVars: { "@primary-color": "#1DA57A" }
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  }),
  // demand loading
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  })
);
