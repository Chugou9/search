const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src/Main'),
    mode: "development",
    devtool: "inline-source-map",
    entry: "./index.js",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude:[path.resolve(__dirname, 'node_modules')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        },
                    },
                    'css-loader',
                ]
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: ['.js', '.json', '.css'],
        alias: {
            Common: path.resolve(__dirname, 'src/Common'),
            Main: path.resolve(__dirname, 'src/Main'),
            'Styles': path.resolve(__dirname, 'src/Styles')
        }
    },
    target: "web",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: 'index.html'}),
        new MiniCssExtractPlugin({
            filename: 'app.css',
            chunkFilename: '[id].css',
        }),
    ]
};