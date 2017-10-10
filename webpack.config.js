const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const extractSASS = new ExtractTextPlugin({
    allChunks: true,
    filename: 'output.css',
});

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
    },
    entry: () => {
        const obj = {
            common: glob.sync('js/*.js'),
            styles: './src/styles/main.scss',
        };

        const products = glob.sync('./src/js/products/*.js');
        const suppliers = glob.sync('./src/js/suppliers/*.js');
        const clients = glob.sync('./src/js/clients/*.js');
        console.log(products);
        console.log(suppliers);
        console.log(clients);
        // const products = [];
        // const suppliers = [];
        // const clients = [];

        if (products.length > 0) {
            obj.products = products;
        }
        if (suppliers.length > 0) {
            obj.suppliers = suppliers;
        }
        if (clients.length > 0) {
            obj.clients = clients;
        }

        return obj;
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                            },
                        },
                    ],
                }),
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].min.js',
        publicPath: '/',
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            service_url: JSON.stringify('http://localhost:3033'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: Infinity,
        }),
        new webpack.NamedChunksPlugin(),
        extractSASS,
        new UglifyJSPlugin({
            test: /products|suppliers|clients|common/i,
            exclude: /common/,
            parallel: {
                cache: true,
                workers: 4,
            },
            sourceMap: true,
            uglifyOptions: {
                ecma: 7,
                warnings: false,
            },
        }),
        new CopyWebpackPlugin([
            {
                context: './src',
                from: {
                    glob: '**/*.html',
                    dot: true,
                },
                to: '.',
            },
        ]),
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src'),
        ],
    },
    stats: {
        children: false,
        chunksSort: 'field',
    },
    target: 'web',
};
