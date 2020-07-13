import { getRequest, postRequest } from '../../utils/api'

const state = {
    logList: [],
    logLoading: false
}

const mutations = {
    setLogList (state, data) {
        state.logList = data
    },
    setLogLoading (state, data) {
        state.logLoading = data
    }
}

const actions = {
    // 新增一条日志
    addLog ({commit}, params) {
        return new Promise((resolve, reject) => {
            postRequest('/task/log/add', params).then(res => {
				res && resolve(res)
			}).catch(err => reject(err))
        })
    },
    // 修改日志
    editLog ({commit}, params) {
        return new Promise((resolve, reject) => {
            postRequest('/task/log/update', params).then(res => {
				res && resolve(res)
			}).catch(err => reject(err))
        })
    },
    // 删除日志
    deleteLog ({commit}, params) {
        return new Promise((resolve, reject) => {
            getRequest('/task/log/delete', params).then(res => {
				res && resolve(res)
			}).catch(err => reject(err))
        })
    },
    // 获取日志
    getLogList ({commit}, params) {
        commit('setLogLoading', true)
        return new Promise((resolve, reject) => {
			postRequest('/task/log/list', params).then(res => {
				let data = res.obj
                commit('setLogList', data)
                commit('setLogLoading', false)
				resolve(res)
			}).catch(err => {
                reject(err)
                commit('setLogLoading', false)
			})
		})
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
