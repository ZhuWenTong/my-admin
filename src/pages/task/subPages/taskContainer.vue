<template>
    <div class="task-container">
        <create-task />
        <div v-loading="taskLoading">
            <div v-if="taskList && taskList.length">
                <div v-if="!taskLoading">
                    <task-item v-for="item in taskList" :key="item.name" :data="item" @click.native="editTask(item)" />
                </div>
            </div>
            <div class="no-result" v-if="taskList.length === 0 && !taskLoading">
                <img :src="imgUrl" />
                <p>暂无任务</p>
            </div>
        </div>
        <dialog-task-edit v-if="dialogVisible" :dialogVisible.sync="dialogVisible" :data="taskContent" :requestParams="requestParams" />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import createTask from '../components/createTaskInput'
import taskItem from '../components/taskItem'
import dialogTaskEdit from '../components/dialogTaskEdit'
export default {
    props: {
        requestParams: Object
    },
    data () {
        return {
            dialogVisible: false,
            taskContent: null,
            imgUrl: require('@/assets/img/no-search-result.png')
        }
    },
    computed: {
        ...mapState('task', ['taskList', 'taskLoading'])
    },
    components: {
        createTask,
        taskItem,
        dialogTaskEdit
    },
    methods: {
        editTask (item) {
            this.taskContent = item
            this.dialogVisible = true
        }
    }
}
</script>
<style lang="scss">
.task-container {
    .no-result {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            height: 300px;
        }
    }
}
</style>
