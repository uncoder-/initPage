# 项目运行

```bash
git clone git@github.com:uncoder-/initPage.git
// 安装依赖
yarn
// 运行
yarn start
// 打开浏览器
http://localhost:9000/example.html#/
```

# webpack 相关

* externals 消除库的打包依赖，使用 cdn 来缩小体积
* proxy 本地请求代理转发
* 插件
    1. UglifyJSPlugin(压缩)
    2. HtmlWebpackPlugin(模版)
    3. ExtractTextPlugin(css 合并)
    4. DashboardPlugin(bundle 文件分析监控)
    5. CommonsChunkPlugin（抽取公共模块，根据内容生成 hash）
    6. ModuleConcatenationPlugin 减少闭包数量，提升 js 运行效率
    7. DefinePlugin(全局替换)
    8. AggressiveSplittingPlugin(chunk 拆包)

# postCss 相关

* 插件
    1. autoprefixer(前缀补全)
    2. cssnano(样式压缩)
    3. stylelint(格式化)

# 代码风格相关

* eslint、stylelint
* prettier
* EditorConfig
