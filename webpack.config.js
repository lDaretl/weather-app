const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
//const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        filename: './js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        //new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            // {
            //     test: /\.css$/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'assets/styles/[name].[contenthash][ext]'
            //     }
            // },
            {
                test: /\.scss$/,
                type: 'asset/resource',
                use: ['sass-loader'],
                generator: {
                    filename: 'assets/styles/[name].[contenthash].css'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
        ]
    }
}