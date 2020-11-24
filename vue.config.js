const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    devServer: {
        proxy: {
            '/api': { //此处要与 /services/api.js 中的 API_PROXY_PREFIX 值保持一致
                target: 'http://192.168.0.169/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
	configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
	},
	productionSourceMap: false,
	lintOnSave: false
}
