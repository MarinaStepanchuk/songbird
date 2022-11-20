const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { is } = require('immutable');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = (extra) => {
    const config = {}

    if(isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
    ]

    if(extra) {
        loaders.push(extra)
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        start: './js/start.js',
        quiz: './js/quiz.js',
        score: './js/score.js',
        gallery: './js/gallery.js',
        header: './js/header.js',
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', '.css', '.svg', '.png', '.jpg'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'eval',
    optimization: optimization(),
    devServer: {
        port: 3000,
        open: true,
        hot: isDev,
        watchFiles: ['src/pages/*.html']
    },
    plugins: [
        new HTMLWebpackPlugin ({
            inject: false,
            filename: 'index.html',
            template: './pages/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new HTMLWebpackPlugin ({
            inject: false,
            filename: 'quiz.html',
            template: './pages/quiz.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new HTMLWebpackPlugin ({
            inject: false,
            filename: 'score.html',
            template: './pages/score.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new HTMLWebpackPlugin ({
            inject: false,
            filename: 'gallery.html',
            template: './pages/gallery.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin ({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'build', 'assets')
                },
            ]
        }),
        new MiniCssExtractPlugin ({
            filename: 'main.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            // Loading SCSS
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            // Loading images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // Loading fonts
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            }
        ]
    }
}