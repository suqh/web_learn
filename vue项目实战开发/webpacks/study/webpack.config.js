const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // 编译模式
    mode: 'development', //development production
    // 打包入口文件
    entry: path.join(__dirname, './src/index.js'),
    // 输出文件
    output: {
        // 输出文件的存放路径
        path: path.join(__dirname, './dist'),
        // 输出文件的名称
        filename: 'bundle.js'
    },
    plugins: [htmlPlugin, new VueLoaderPlugin],
    module: {
        rules: [
            // use 数组中指定的 loader 顺序是固定的
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // limit用来指定图片的大小 单位是字节 只有小于limit大小的图片 才会被转为base64图片
            { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16940' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    }
}