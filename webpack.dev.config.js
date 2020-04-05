const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?/',
            'webpack/hot/dev-server',
            path.resolve(__dirname, './src/index.jsx')
        ],
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname),
        filename: 'main.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    externals: {
        'fs': true,
        'path': true,
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js[x]?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(md|glsl)$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|mp4)$/,
                exclude: /gltf/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 15000,
                    }
                }
            },
            {
                test: /\.json$/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.gltf$/,
                use: {
                    loader: 'gltf-loader-2'
                }
            },
            {
                test: /\.gltf.*\.(bin|png|jpe?g|gif)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/gltf/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
    
}