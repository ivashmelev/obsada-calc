const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        './app/main.js'
    ],
    output: {
        //path: "/../public/backend/js",
        //publicPath: "/../public",
        filename: "calc.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/src|vue-router\//,
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.min.js',
        }
    },
    plugins: [
        new UglifyJsPlugin({}),
        new webpack.ProvidePlugin({

        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
}