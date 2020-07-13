export default {
    data () {
        return {
            userId: ''
        }
    },
    mounted () { 
        this.userId = JSON.parse(sessionStorage.getItem('user')).id
		this.initWebSocket() // 页面渲染的时候，对ws进行初始化
	},
    methods: {
        initWebSocket () { 
            // let url = `ws://192.168.0.163:8081/websocket/${this.userId}`  // 本地
            let url = `ws://139.196.34.133:30231/websocket/${this.userId}` // 测试服务器
            this.webSocket = new WebSocket(url)
            this.webSocket.onmessage = this.webSocketOnMessage
            this.webSocket.onerror = this.webSocketOnError
            this.webSocket.onopen = this.webSocketOnOpen
            this.webSocket.onclose = this.webSocketClose
        },
        webSocketOnOpen () { // 连接建立之后执行send方法发送数据，这个和自己的后端沟通好需要传什么数据
            // let token = sessionStorage.getItem('token')
            // this.sendPing()
        },
        webSocketOnError () { //连接错误
            console.log('WebSocket连接失败')
        },
        webSocketOnMessage (e) { // 数据接收
            window.dispatchEvent(new CustomEvent('onmessageWS', {
                detail: {
                    data: e
                }
            }))
        },
        webSocketClose (e) {  // 关闭连接
            console.log('已关闭连接', e)
        },
        sendPing () {
            this.webSocket.send(`${this.userId}|${this.userId}`)
            // this.timer = setInterval(() => {
            //     this.webSocket.send(`${this.userId}|${this.userId}`)
            // }, 10000)
        }
    },
    destroyed () {
        clearInterval(this.timer)
        this.webSocket.close() // 页面销毁后断开websocket连接
    }
}
