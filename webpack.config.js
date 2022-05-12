let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js', // 入口文件,
    devServer: {
        port: 8080,
        // contentBase: path.resolve(__dirname, '/'), //本地服务器所加载的页面所在的目录
        hot: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader?cacheDirectory',// 缓存每次的解析结果 加载更快
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ],
                        plugins: ["react-hot-loader/babel", '@babel/plugin-syntax-jsx']
                    },
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'] // 从右到左执行顺序
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: './',
                        limit: 4 * 1024,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),//查找模板文件
        })
    ]
}
