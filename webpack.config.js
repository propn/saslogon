const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//清理built目录
const CopyWebpackPlugin = require('copy-webpack-plugin');//复制静态图片资源
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入html-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css文件
const SVGURLLOADER = require('svg-url-loader');//处理svg图片

module.exports = { 
    entry: {
        index:'./src/index.js',
        logout:'./src/logout.js',
        cistudio:'./src/cistudio.js',
    },
    output: {
        filename:'[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
    },
    // optimization: { //抽取公共js文件####有问题
    //     minimize: false,
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				chunks: "all",
	// 				minChunks: 2,
	// 				maxInitialRequests: 1, // The default limit is too small to showcase the effect
    //                 minSize: 1 ,// This is example is too small to create commons chunks
    //                 enforce: true                    
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: "all",
    //                 name: "vendor",
    //                 priority: 10,
    //                 enforce: true
    //             }
	// 		}
    //     },
    //     runtimeChunk: {
    //         name: 'runtime'
    //     },
	// },
    module: { // 处理对应模块
        rules: [
            {
                test: /\.css$/, //提取css到单独文件
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader",
                })
            },
            { test: /\.(ttf|eot|woff|woff2)$/,// 处理字体文件的loader 
                 use: 'url-loader' 
            }, 
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/',//输出到images文件夹
                        limit:1,  //是把小于500B的文件打成Base64的格式，写入JS
                        name:'[name].[ext]',
                    }
                }]
            },
			{
			    test: /\.svg/,
			    use: {
			        loader: 'svg-url-loader',
			        options: {}
			    }
			}
        ]
    },
	plugins: [// 对应的插件
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([ //处理html的<img标签图片资源
            { from: __dirname+'/src/themes', to: __dirname+'/dist/themes', },
        ]),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({ //配置
            title: 'SAS® Logon Manager',
            favicon: 'src/themes/default/images/favicon.ico',
            filename: 'index.html',//输出文件名
            template: './src/index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
			chunks: ['index'], // 默认会将打包出的所有 js 插入 html。故需指明页面需要的模块
        }),
        new HtmlWebpackPlugin({ //配置
            title: 'SAS® Logon Manager',
            favicon: 'src/themes/default/images/favicon.ico',
            filename: 'logout.html',//输出文件名
            template: './src/logout.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
			chunks: ['logout'], // 默认会将打包出的所有 js 插入 html。故需指明页面需要的模块
        }),
        new HtmlWebpackPlugin({ //配置
            title: 'SAS CI Studio',
            favicon: 'src/themes/default/images/favicon.ico',
            filename: 'cistudio.html',//输出文件名
            template: './src/cistudio.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
			chunks: ['cistudio'], // 默认会将打包出的所有 js 插入 html。故需指明页面需要的模块
        }),
    ],    
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        historyApiFallback: false,//true默认打开index.html，false会出现一个目录
        watchContentBase: true,//热更新
        host: 'localhost',//主机地址
        port: 9090,//端口号
        compress: true//开发服务器是否启动gzip等压缩
    },

}