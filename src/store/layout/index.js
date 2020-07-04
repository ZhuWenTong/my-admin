const state = {
    layoutData: {}
}

const mutations = {
    changeLayout (state, data) {
        state.layoutData = data
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
