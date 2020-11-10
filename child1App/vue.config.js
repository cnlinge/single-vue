const StatsPlugin = require('stats-webpack-plugin')
module.exports = {
  configureWebpack: {
    output: {
      library: "singleVueChild1", // 以库的形式导出入口文件
      libraryTarget: "window",// 以库的形式导出入口文件时 输出的类型  默认是var
    },
    plugins: [
      new StatsPlugin('manifest.json', {
        chunkModules: false,
        entrypoints: true,
        source: false,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      }),
    ]
  },
}
