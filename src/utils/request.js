import Axios from 'axios'
import qs from 'querystring'
import { Message, MessageBox } from 'element-ui'

Axios.defaults.baseURL = 'http://192.168.0.169'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const ajax = Axios.create({
	timeout: 10000
})
//请求拦截
ajax.interceptors.request.use(config => {
	console.log(config)
	if(config.method == 'post') {
		config.data = qs.stringify(config.data)
	}
	return config
}, err => {
	console.log(err)
	return Promise.reject(err)
});
/**
 * B0097: 请求错误 
 * S0002: session失效
 * 响应拦截
 */
ajax.interceptors.response.use(
	response => {
		const res = response.data
		return res
	},
	err => {
		Message({
      		message: err.message,
      		type: 'error',
      		duration: 3 * 1000
    	})
		return Promise.reject(err)
	}
)

const postRequest = (url, params) => {
    return Axios({
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    postRequest
}


