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
            // options: {
                // hmr: isDev,
                // reloadAll: true,
            // },
                // options: {
                //     emit: false,
                // },
        },
        'css-loader'
    ]

    if(extra) {
        loaders.push(extra)
    }

    return loaders
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build'),
        clean: true,
        assetModuleFilename: 'assets/img/[name][ext]',
        // assetModuleFilename: pathData => {
        //     const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        //     return `${filepath}/[name][ext]`;
        // },
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', '.css', '.svg', '.png', '.jpg'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    // devtool: 'source-map',
    devServer: {
        port: 3000,
        open: true,
        hot: isDev,
        watchFiles: ['src/pages/*.html']
    },
    plugins: [
        new HTMLWebpackPlugin ({
            filename: 'index.html',
            template: './pages/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        // new HTMLWebpackPlugin ({
        //     filename: 'quiz.html',
        //     template: './pages/quiz.html',
        //     minify: {
        //         collapseWhitespace: isProd
        //     }
        // }),
        // new HTMLWebpackPlugin ({
        //     filename: 'score.html',
        //     template: './pages/score.html',
        //     minify: {
        //         collapseWhitespace: isProd
        //     }
        // }),
        // new HTMLWebpackPlugin ({
        //     filename: 'gallery.html',
        //     template: './pages/gallery.html',
        //     minify: {
        //         collapseWhitespace: isProd
        //     }
        // }),
        // new CleanWebpackPlugin (),
        new CopyWebpackPlugin ({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img'),
                    to: path.resolve(__dirname, 'build', 'assets/img')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'build', 'assets')
                }
            ]
        }),
        new MiniCssExtractPlugin ({
            filename: filename('css'),
        }),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            //html
            // {
            //     test: /\.html$/i,
            //     loader: "html-loader",
            // },
            // Loading CSS
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