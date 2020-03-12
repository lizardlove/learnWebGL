const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const pathTable = {}

function camelcase2Dash(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function getDirectories(dp) {
    return fs.readdirSync(dp).filter(file => {
        return fs.statSync(path.join(dp, file)).isDirectory() && file.substr(0,1) !== "."
    })
}

getDirectories(path.resolve(__dirname, './src/collection')).forEach(dir => {
    pathTable[camelcase2Dash(dir)] = dir
})

function dash2Camelcase(str) {
    return pathTable[str]
}

const express = require('express')
const app = new express()
const port = 8888
const proxyPort = port + 1

const config = require('./webpack.dev.config')

config.plugins.push(
    new webpack.DefinePlugin({
        'globalEnv': {
            NODE_ENV: JSON.stringify('development')
        }
    })
)

app.use((req, res, next) => {
    const regexRes = /^(\/effect\/)([a-zA-Z0-9\-]+)(\/?.+)/.exec(req.url)
    if (regexRes && dash2Camelcase(regexRes[2])) {
        req.url = `${regexRes[1]}${dash2Camelcase(regexRes[2])}${regexRes[3]}`
    }
    next()
})

app.use('/effect', express.static(path.resolve(__dirname, './src/collection')))

const devServer = () => {
    const server = new webpackDevServer(webpack(config), {
        compress: true,
        progress: true,
        hot: true,
        open: true,
        publicPath: config.output.publicPath,
        contentBase: path.resolve(__dirname),
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        https: false,
        overlay: true,
        historyApiFallback: true,
        proxy: {
            '/effect': {
                target: `http://localhost:${proxyPort}`,
                bypass: (req, res, proxyOptions) => {
                    if (!/^\/effect\/([a-zA-Z0-9\-]+)(\/.+)/.test(req.path)) {
                        return '/index.html'
                    }
                }
            }
        }
    })
    
    server.listen(port, 'localhost', (error) => {
        if (error) {
            console.log('webpack dev server failed', error)
        }
        console.info('wenpack listening on port %s', port)
    })
}

app.listen(proxyPort, function (error) {
    if (error) {
        console.error(proxyPort)
    } else {
        console.info('derServer listening on port %s', proxyPort)
    }
})

devServer()