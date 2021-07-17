const webpack = require("webpack");
const webpackGlobalConfig = require("./webpack/webpack.prod");
const webpackPostConfig = require("./webpack/post/webpack.prod");
const gulp = require("gulp");

configs = [webpackGlobalConfig, webpackPostConfig];

function buildGlobal(cb) {
  return new Promise((resolve, reject) => {
    webpack(configs[0], (err, stats) => {
      if (err) {
        console.log("error");
        return reject(err);
      }
      if (stats.hasErrors()) {
        console.log("error stats");
        return reject(new Error(stats.compilation.errors.join("\n")));
      }
    });
    resolve();
  });
}

function buildPosts(cb) {
  return new Promise((resolve, reject) => {
    webpack(configs[1], (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join("\n")));
      }
    });
    resolve();
  });
}

module.exports = {
  buildGlobal: buildGlobal,
  buildPosts: buildPosts,
};
