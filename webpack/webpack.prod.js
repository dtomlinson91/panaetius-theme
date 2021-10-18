const AssetsPlugin = require("assets-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../static/dist"),
    filename: "[name].[contenthash].min.js",
    chunkFilename: "[id].[name].[contenthash].min.js",
    publicPath: "/dist/",
  },
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      // Global exposes
      {
        // Exposes jQuery for use outside Webpack build
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["$", "jQuery"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // creates the assets.json for Hugo to insert
    new AssetsPlugin({
      filename: "assets.json",
      path: path.resolve(__dirname, "../data/panaetius-theme"),
      prettyPrint: true,
      fullPath: false,
    }),
    // cleans the folders/files on every run
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["../static/dist/*", "../data/panaetius-theme/*.json"],
    }),
    // extract css into own files outside of js when built with webpack
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].min.css",
      chunkFilename: "[name].[contenthash].min.css",
    }),
    // provides process
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    // reads from .env files
    new Dotenv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
