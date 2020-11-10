
module.exports = {
    configureWebpack: {
      output: {
        library: "singleVueChild1", // 以库的形式导出入口文件
        libraryTarget: "window",// 以库的形式导出入口文件时 输出的类型  默认是var
      },
    },
  }
