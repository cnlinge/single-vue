
module.exports = {
    // publicPath: "//localhost:3000/",
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    // css: {
    //     extract: false
    // },
    configureWebpack: {
        output: {
            library: "singleVueChild1",
            libraryTarget: "window",
        },
    },
    // devServer: {
    //     contentBase: './',
    //     compress: true,
    // }
}
