const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const config = {
  mode: "production",
  entry: resolve(__dirname, "./temporary/index.js"),
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "index.js"
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./temporary")
    }
  },
  target: "node",
  externals: {},
  plugins: [new CleanWebpackPlugin()]
};
module.exports = config;
