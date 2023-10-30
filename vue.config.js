const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  devServer: {
    port: 9999,
    allowedHosts: 'all',
  },
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compiler = require('vue-template-babel-compiler');
        return options;
      });
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'));
  },
  configureWebpack: {
    output: {
      filename: `js/[name]-${Date.now()}.js`,
      chunkFilename: `js/[name].${Date.now()}.js`,
    },
  },
});
