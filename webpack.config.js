const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTestPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: {
        common: [
            './src/js/utils.js',
            './src/js/api.js',
        ],
        products: glob.sync('./src/**/products/*.{js,html}'),
        suppliers: glob.sync('./src/**/suppliers/*.{js,html}'),
        clients: glob.sync('./src/**/clients/*.{js,html}'),
    },
    loader: [{
        test: '',
    }],
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTestPlugin.extract({
                loader: ['raw-loader', 'sass-loader'],
                // options: {
                //     sourceMap: true,
                //     'output-style': 'compressed',
                // },
            }),
        }],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.min.js',
            minChunks: Infinity,
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Autoparts - Frontend',
            filename: './dist/output.html',
            inject: 'body',
        }),
        new ExtractTestPlugin({
            filename: './dist/output.css',
            allChunks: true,
        }),
        // new UglifyJSPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false,
        //     },
        // }),
    ],
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 1000,
    // },
};
