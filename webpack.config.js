const path = require("path");
const config = require('./w.config');

// dev环境配置
module.exports = {
  devtool: config.devtool,
  entry: config.entry,
  output: {
    path: path.join(__dirname, 'server'),
    filename: 'app.js',
  },
  module: {
    rules: config.loaders,
  },
  plugins: config.devPlugins,
  devServer: config.devServer,
  mode: 'development',
};
