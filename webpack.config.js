const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "development",
    entry: './src/js/index.js',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {test: /\.(js)$/, exclude: '/node_modules/', use: [{loader: 'babel-loader'}]},
            {test:  /\.scss$/, use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'file-loader', options: {name: '[name].[ext]', outputPath: 'fonts/'}}]},
            {test: /\.html$/, use: [{loader: 'html-loader', options: {minimize: true}}]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/assets', to: './assets' }
            ]
        })
    ]
}