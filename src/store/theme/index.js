const state = {
    systemTheme: ''
}

const mutations = {
    setSystemTheme (state, data) {
        state.systemTheme = data
    }
}

const actions = {}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
