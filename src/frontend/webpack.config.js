const path = require('path');
const Html_webpackPlugin = require('html-webpack-plugin');
const Mini_cssExtractPlugin = require('mini-css-extract-plugin');


const mode = { dev: 'development', prod: 'production',};
const setMode = mode.prod;

const output = {
    'html': './public/index.html',
    'js': 'static/[name].[contenthash:8].js',
    'style': 'static/css/[name].[contenthast:8].css'
};

module.exports = () => {
    return {
        mode: setMode,
        //multiple entry points
        entry: { 
            main: './src/index.js'
        },
    
        plugins: [
            new Html_webpackPlugin({
                //when use a template index html
                template: output.html,
            }),
            new Mini_cssExtractPlugin({
                filename: output.style,
            }),
        ],
    
        output: {
            //main folder
            path: path.resolve(__dirname, 'build'),
            //js output file
            filename: output.js,
            //clean all files in build folder for each build
            clean: true,
        },
    
        module: {
            rules: [
                {
                    //Js/jsx
                    test:/\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    //style
                    test: /\.(css|scss|sass)$/i,
                    use: [
                        { loader: Mini_cssExtractPlugin.loader },
                        'css-loader',
                        'sass-loader'
                    ]
    
                },
                {
                    //ressourcen
                    test: /\.(png|jpg|ico)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/assets/[name].png'
                    }
                }
            ]
        },
    };
};