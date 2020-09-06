const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.export = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    devtool: "inline-source-map",
    entry: "src/Main/index.js",
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
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
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
            "Common": path.resolve(__dirname, 'src/Common'),
            "Main": path.resolve(__dirname, 'src/Main'),
        }
    },
    target: "web",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './src/Main/index.html'})
    ]
};