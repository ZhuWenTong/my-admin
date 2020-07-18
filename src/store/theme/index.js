const state = {
    systemTheme: {}
}

const mutations = {
    setSystemTheme (state, data) {
        state.systemTheme = data
        localStorage.setItem('theme', JSON.stringify(data))
        document.body.className = data.value ? `custom-${data.value}` : 'custom-default'
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
