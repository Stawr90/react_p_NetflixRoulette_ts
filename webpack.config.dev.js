const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
        {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(js|jsx)$/, 
            exclude: /node_modules/,
            use: ["babel-loader"],
        },
        {
            test: /\.html$/i,
            loader: "html-loader",
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
        },
        {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'resources/img',
              }
            },
          ],
        },
        {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react', '@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
        }
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx", ".scss"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          template: "./public/index.html"
      })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080
    }
};