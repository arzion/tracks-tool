'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development'; // global varibale to determine the build type
const webpack = require('webpack'); // getting webpack as module (gives access to webpack object with plugins)

module.exports = {
    context: __dirname + '/frontend', // main path of sources

    entry: {
        app: "./app" // app.js - the entry point of application
    },

    output: {
        path: __dirname + '/public/dist', // the path where files will be compiled
        publicPath: '/dist/', // just we need to specify the public path to allow dynamic requiers work
        filename: "[name].js", // compilation file name pattern (name -> name of entry point)
        library: "[name]" // compiled file will return the global variable called [name] -> entry point name
    },

    watch: NODE_ENV == 'development', // watch - true - allows listen editing the files and re-build on changes
    watchOptions: {
        aggregateTimeout: 100 // delay before re-building
    },

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null, // adding source-map

    plugins: [
        new webpack.NoErrorsPlugin(), // if errors during compilation - no results
        new webpack.DefinePlugin({ // make variables global-accessed
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('en')
        }),
        new webpack.optimize.CommonsChunkPlugin({ // all common code from entry points will be placed to the common.js file
            name: 'common'
        }),
        new webpack.OldWatchingPlugin() // if watch works bad - just add this plugin
    ],

    resolve: {  // how and where to find modules
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: { // how and where to find loaders
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {
        loaders: [{ // loaders that are injected into the compilation pipeline
            test: /\.js$/,
            loader: 'babel', // loader that compiles ECMA-6(7) to ECMA-5 js
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime'] // all helper fucntions should be placed into the common module
            }
        }]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ // minimise the javascript files during compilation
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
