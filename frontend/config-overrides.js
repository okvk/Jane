const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // demand loading
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // less loader
  addLessLoader({
    javascriptEnabled: true,
    // customizing antd
    // modifyVars: { "@primary-color": "#1DA57A" }
  }),
);
