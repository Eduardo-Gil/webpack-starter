const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const path = require('path');  
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {

    mode: "development",
    
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
        filename: '[name].css'
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
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    }
};