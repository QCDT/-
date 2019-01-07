module.exports ={
    devServer: {
        open: true, //自动开启浏览器
        host: 'localhost', //本地服务地址
        port: 8080, //端口号
        https: false, //是否是https协议
        hotOnly: false, //热加载
        //代理
        // http://m.kugou.com/?json=true
        proxy: {
            '/api': {
                target: 'http://m.kugou.com/',
                secure:false, //是否是https
                changeOrigin:true, //是否允许跨域
                pathRewrite:{
                    "^/api":''
                }
            }
        }
    }
}