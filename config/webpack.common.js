const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const aliases = require("../tsconfig.aliases.json");

function getWebpackAliasesFromPaths(configPaths) {
  return Object.entries(configPaths).reduce(
    (webpackAliases, [configAlias, configPathList]) => {
      const [aliasKey] = configAlias.split("/");
      const [relativePathToDir] = configPathList[0].split("/*");
      return {
        ...webpackAliases,
        [aliasKey]: path.resolve("./src", relativePathToDir),
      };
    },
    {}
  );
}

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        oneOf: [
          {
            test: /\.module\.scss$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: {
                    localIdentName: "[local]__[hash:base64:5]",
                    exportLocalsConvention: "camelCaseOnly",
                  },
                },
              },
              { loader: "sass-loader" },
            ],
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    alias: getWebpackAliasesFromPaths(aliases.compilerOptions.paths),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: "./public/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/manifest.json", to: "./" },
        { from: "./public/robots.txt", to: "./" },
        { from: "./public/favicon.ico", to: "./" },
      ],
    }),
  ],
};
