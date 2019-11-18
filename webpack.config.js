const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  //默认为 production,打包后代码会被压缩
  //可选项 development,打包后代码不会被压缩
  mode:'development',
  //https://www.webpackjs.com/configuration/devtool/#devtool
  //构建后报错能查看原始代码,source-map.txt 原理说明地址
  devtool:"cheap-eval-source-map ",
  //代码改变自动刷新浏览器，也打包但是文件放到了内存中，为了提升打包速度
  devServer:{
    contentBase:'./dist',
    //运行时自动打开浏览器访问
    open:true,
    port:8080,
    //HotModuleReplacement开启
    hot:true,
    //为true不会刷新页面
    hotOnly:true
  },
  //打包的入口文件
  entry:{
   main:'./src/index.js',
    // main1:'./src/index.js',
  },
  module:{
    rules:[
      //babel 与webpack 的使用https://www.babeljs.cn/setup#installation
      {
        test: /\.js$/,
        //排除 node_modules 下的js
        exclude: /node_modules/,
        //webpack 和 babel 之间的桥梁
        loader: "babel-loader",
        options:{
          // 业务场景使用
          // presets: [
          //   ["@babel/preset-env",
          //     {
          //       //按需使用配置，包会变小
          //       useBuiltIns:'usage',
          //       targets:{
          //         chrome:"67"
          //       }
          //     }
          //   ]
          // ]
          // 插件场景使用，开发第三方库时
          // 'plugins': [
          //   ["@babel/plugin-transform-runtime",
          //     {
          //       "corejs": 2,
          //       "helpers": true,
          //       "regenerator": true,
          //       "useESModules": false
          //     }
          //   ]
          // ]
        }
      },
      //大于 10kb 时候图片打包成文件,小于10kb 打包成base64格式
      {
        test: /\.(png|jpg|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            name:'[name]_[hash].[ext]',
            output:'images/',
            limit:10240
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        //多个loader使用数组[],加载顺序为从后向前,顺序很重要
        //'style-loader'(挂载样式到style标签),'css-loader'(编译css之前的关系,如@import),
        // sass-loader(编译scss格式为css,注意:查阅文档,同时还需要安装 node-sass).
        // postcss-loader(样式预处理,如增加不同浏览器前缀,注意:需要 postcss.config.js配置文件).一定在sass-loader 后加载
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              //@import引入的scss文件也会走前面的两个 loader
              importLoaders:2,
              //css 模块化,使用见index.js
              modules:true
            }
          },
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  /**
   * plugin可以在webpack运行到某一个时刻的时候，帮你做一些事情
   */
  plugins:[
    /**
     * htmlwebpackplugin 会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中，
     * 但是生成的html不包含根节点节点id，可以手动配置：
     */
    new HtmlWebpackPlugin({template:'src/index.html'}),
    //清除目录插件
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['../dist'],
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    //模块热更新插件:模块变化不刷新页面更新，且其他模块不会重置
    new webpack.HotModuleReplacementPlugin()
  ],
  output:{
    //引入公共前缀地址
    // publicPath:'https://cdn.com/',
    filename:'[name].js',
    path : path.resolve(__dirname,'dist')
  }
}