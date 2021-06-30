const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const path = require('path');  
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');

const Terser = require("terser-webpack-plugin");
const { mainModule } = require('process');

module.exports = {

    mode: "production",
    
    module: {

        
        rules: [
            {
              test: /\.html$/i,
              loader: 'html-loader',
              options: {
                // Disables attributes processing
                sources: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    plugins:[
    new HtmlWebPack({
        title: 'Mi Webpack App',
        filename: './index.html',
        template: './src/index.html'
        
    }),
    new MiniCssExtract({
        filename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
        patterns: [
          { from: "src/assets/", to: "assets/" },
          
        ],
        options: {
            concurrency: 100,
        },
          
    }),
    
    ],
    output: {
            clean: true,
            filename: 'main.[contenthash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    optimization: {
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    }
};