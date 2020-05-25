const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'static/dist')
    }
}
