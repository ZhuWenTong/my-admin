import menuData from './data'
const state = {
    menuList: [],
    menuLoading: false
}

const mutations = {
    setMenuList (state, data) {
        state.menuList = data
    },
    setMenuLoading (state, data) {
        state.menuLoading = data
    }
}

const actions = {
    getMenuList ({commit}, data) {
        commit('setMenuLoading', true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('setMenuList', menuData)
                commit('setMenuLoading', false)
                resolve(menuData)
            }, 1000)
        })
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
