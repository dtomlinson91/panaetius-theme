const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizer = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  // entry: { main: path.resolve(__dirname, "src/main.js") },
  output: {
    path: path.resolve(__dirname, "../static/dist"),
    filename: "[name].[contenthash].min.js",
    chunkFilename: "[id].[name].[contenthash].min.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|otf)$/,
        use: ["file-loader"],
      },
      // {
      //   // Exposes jQuery for use outside Webpack build
      //   test: require.resolve("jquery"),
      //   use: [
      //     {
      //       loader: "expose-loader",
      //       options: {
      //         exposes: ["$", "jQuery"],
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].min.css",
      chunkFilename: "[name].[contenthash].min.css",
      sourceMap: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    // Disabling jquery plugin provider to test global bootsrap. Requires manual adding of jquery in all files.
    // new webpack.ProvidePlugin({
    //   // Provides jQuery for other JS bundled with Webpack
    //   $: "jquery",
    //   jquery: "jquery",
    //   // bootstrap: "bootstrap",
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizer(),
    ],
  },
};
