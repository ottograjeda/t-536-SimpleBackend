// webpack is similar to gulp BUT specialized to only bundle
// ref = https://webpack.js.org/concepts/loaders/

const webpack = require('webpack');
const path = require('path')

//const CopyPlugin = require('copy-webpack-plugin'); // fail = will need to use unix cp or gulp
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // per https://webpack.js.org/plugins/uglifyjs-webpack-plugin/

// ES6 note
// Tell webpack to minimize the bundle using the TerserPlugin. This is true by default in production mode.
// https://webpack.js.org/configuration/optimization/

module.exports = {    
    devServer: {
         contentBase: 'https://localhost',
         port: 8000,
         // Send API requests on localhost to API server get around CORS.
         /* 
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept"
         },
         */
         // Create Proxy for local client to local server
         /*
         proxy: {
            '/api': {
               target: {
                  host: "localhost",
                  protocol: 'https:',
                  port: 3000
               }
            }
         }
         */
    },
    //mode: "production", // If you use Webpack 4, you don't need to change webpack.config.js. It remains the same in both development and production modes.
    entry: "./index.web.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        //publicPath: 'web/',
        filename: "js/bundle.js",
        sourceMapFilename: "js/bundle.map"
        },
    devtool: 'false', // options = false, source-map ; source-map creates .map files
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            extractComments: 'all', // options = true, all ; source maps may not be created properly
          }),
        ],
    },
    resolve: { 
        alias: {
            '@react-native-community/async-storage': 'react-native-web'
            },
        modules: ['node_modules']
        },
    module: {
        rules: [
            // 1st Rule
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: [ 
                { loader: 'babel-loader' },
                //{ loader: 'react-hot-loader' }
                ]
            },
            // 2nd Rule per https://webpack.js.org/guides/asset-management/#loading-images
            // other = https://medium.com/a-beginners-guide-for-webpack-2/handling-images-e1a2a2c28f8d
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]' // og.note: reference to folder path /public/images ; if no folder, it will be created
                    } 
                }],
            },
            // 3rd Rule per https://itnext.io/react-svg-images-and-the-webpack-loader-to-make-them-play-nice-2d177ae34d2b?gi=84a15c2f2d1e
            // other = https://www.robinwieruch.de/react-svg-icon-components#react-svg-icon-components-webpack
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            // 4th Rule
            // requires pkg css-loader 
            { 
                test: /\.css$/, 
                //use: ['style-loader']
                //exclude: /node_modules/, // comment out to fix error = Module parse failed: Unexpected character '@' (1:0)
                // per facepalm @ https://stackoverflow.com/questions/51370025/webpack-4-unexpected-character
                // NOTE = will create bigger file = WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
                use: ['style-loader', 'css-loader'],
            },
            // 5th Rule
            // requires pkg sass-loader per https://github.com/webpack-contrib/sass-loader
            {
                //test: /\.s[ac]ss$/i,
                test: /\.s[a]ss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader', ],
            },
            // 6th Rule per https://medium.com/@chanonroy/webpack-2-and-font-awesome-icon-importing-59df3364f35c
            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/',    // where the fonts will go
                        //publicPath: '../'       // override the default path
                        //publicPath: './'       // override the default path
                    }
                }]
            },
        ]
    }
};
