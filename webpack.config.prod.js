const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/
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
        test: /\.(png|jpe?g|gif)$/i,
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
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [new UglifyJsPlugin()]
    }
};