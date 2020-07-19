const state = {
    systemTheme: {},
    systemThemeLoading: false
}

const mutations = {
    setSystemTheme (state, data) {
        state.systemTheme = data
        localStorage.setItem('theme', JSON.stringify(data))
        document.body.className = data.value ? `custom-${data.value}` : 'custom-default'
        
    },
    setSysThemeLoading (state, data) {
        state.systemThemeLoading = data
    }
}

const actions = {
    compileSysTheme ({commit}, data) {
        commit('setSysThemeLoading', true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('setSysThemeLoading', false)
                commit('setSystemTheme', data)
                resolve()
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
