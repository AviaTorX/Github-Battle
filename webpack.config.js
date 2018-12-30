var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require("path");
var config = {
    mode:"none",
    entry:"./src/index.tsx",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js"
    },
    resolve:{
        extensions:[".ts", ".tsx", ".js", ".css"]
    },
    module:{
        rules:[
            {test:/\.tsx?$/, loader:"awesome-typescript-loader"},
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
              },
              // Use CSS modules for custom stylesheets
              {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]',
                      camelCase: true,
                    },
                  },
                ]
              }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html', //Name of file in ./dist/
            template: 'index.html', //Name of template in ./src
            hash: true,
          }),
          new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
    ]
};

module.exports = config;