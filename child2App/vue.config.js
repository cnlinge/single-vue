
module.exports = {
    // publicPath: "//localhost:3000/",
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    // css: {
    //     extract: false
    // },
    configureWebpack: {
        output: {
            library: "singleVueChild2", // 以库的形式导出入口文件
            libraryTarget: "window",// 以库的形式导出入口文件时 输出的类型  默认是var
        },
    },
    // devServer: {
    //     contentBase: './',
    //     compress: true,
    // }
}
