const state = {
    layoutData: {}
}

const mutations = {
    changeLayout (state, data) {
        state.layoutData = data
        localStorage.setItem('layout', JSON.stringify(data))
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
