const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const outPath = path.resolve(__dirname, 'dist')
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.jsx'),
        'react-packet': ['react', 'react-dom', 'react-router']
    },
    mode: 'production',
    output: {
        path: outPath,
        filename: 'assets/[name].[hash].js',
        chunkFilename: 'assets/[name].chunk.[hash].js',
        publicPath: './'
    },

    resolve: {
        extensions: ['*','.js', '.md', '.jsx'],
        alias: {
            'gl-matrix': path.resolve(__dirname, './node_modules/gl-matrix/dist/gl-matrix.js')
        }
    },

    externals: {
        'fs': true,
        'path': true
    },

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
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
                        limit: 1000,
                        context: path.resolve(__dirname, 'src/collection'),
                        name: 'assets/[path][name].[ext]'
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
                test: /gltf.*\.(bin|png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/gltf/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },

    optimization: {
        splitChunks: {
            name: 'react-packet',
            minChunks: 2
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({
            filename: 'assets/main.[hash].css',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CompressionWebpackPlugin({
            filename: "[path]",
            algorithm: "gzip",
            test: /\.js$|\.css$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
}