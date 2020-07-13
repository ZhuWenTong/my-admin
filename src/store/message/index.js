import { getRequest, postRequest } from '../../utils/api'
const state = {
    list: [],
    count: 0
}

const mutations = {
    setMsgList (state, data) {
        state.list = data.data
        state.count = data.total
    }
}

const actions = {
    // 获取消息列表
    getMsgList ({commit}, data) {
        return new Promise((resolve, reject) => {
            getRequest('/information/getInformationList').then(res => {
                commit('setMsgList', res)
                res && resolve(res)
            }).catch(err => reject(err))
        })
    },
    // 阅读
    readMsg ({commit}, data) {
        return new Promise((resolve, reject) => {
            postRequest('/information/batchRead', data).then(res => {
                res && resolve(res)
            }).catch(err => reject(err))
        })
    },
    // 删除
    deleteMsg ({commit}, data) {
        return new Promise((resolve, reject) => {
            postRequest('/information/batchDel', data).then(res => {
                res && resolve(res)
            }).catch(err => reject(err))
        })
    }
}

const getters = {
    count: state => state.count > 99 ? '99+' : state.count,
    newList: state => {
        // 展示最新的5条
        let data = JSON.parse(JSON.stringify(state.list))
        return data.filter(i => i.isRead === 1).splice(0, 5)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
