const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production'){
  mode = 'production'
}

// console.log(__dirname)

module.exports = {
  mode: mode,
  resolve: {
    extensions: ['.js', '.ts'],
  },
  entry: {
    scripts: path.resolve(__dirname,'./src/index.ts'),
  },
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname,'src/index.html'),
      }
    ),
    new MiniCssExtractPlugin({
      filename: './styles/[name].[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [
                            [
                                "postcss-preset-env",
                                {
                                    // Options
                                },
                            ],
                        ],
                    },
                },
            },
            "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[file]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[file]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
      }
      ]
  },
}