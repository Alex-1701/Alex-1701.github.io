const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "develop",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../public"),
    },
    compress: true,
    port: 3000,
    https: true,
  },
});
