import { getRequest, postRequest } from '../../utils/api'
const state = {
	taskList: [],
	listCount: 0,
	taskLoading: true
}

const mutations = {
	setTaskList (state, data) {
		let flag = Object.prototype.toString.call(data) === '[object Object]'
		state.taskList = flag ? data.data : []
		state.listCount = flag ? data.total : 0
	},
	setTaskLoading (state, data) {
		state.taskLoading = data
	}
}

const actions = {
	// 新增一条任务
	addTask ({commit}, data) {
		return new Promise((resolve, reject) => {
			postRequest('/task/base/add', data).then(res => {
				res && resolve(res)
			}).catch(err => reject(err))
		})
	},
	// 修改任务
	editTask ({commit}, data) {
		return new Promise((resolve, reject) => {
			postRequest('/task/base/update', data).then(res => {
				res && resolve(res)
			}).catch(err => reject(err))
		})
	},
	// 删除任务
	deleteTask ({commit}, data) {
		return new Promise((resolve, reject) => {
			postRequest('/task/base/delete', data).then(res => {
				res && resolve(res)
			}).catch(err => reject(err))
		})
	},
	// 获取任务列表
	getTaskList ({commit}, data = {
		pageNo: 1,
		pageSize: 10,
		getScope: 0,
		status: 1
	}) {
		commit('setTaskLoading', true)
		return new Promise((resolve, reject) => {
			postRequest('/task/base/list', data).then(res => {
				let data = res.obj
				commit('setTaskList', data)
				commit('setTaskLoading', false)
				resolve(res)
			}).catch(err => {
				reject(err)
				commit('setTaskLoading', false)
			})
		})
	}
}

const getters = {
	taskList: state => state.taskList
}

export default {
    namespaced: true,
	state,
	mutations,
	actions,
	getters
}
