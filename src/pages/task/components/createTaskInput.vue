<template>
    <div class="create-task" :class="{'active': isFocus}">
        <div class="input-area">
            <i class="el-icon-plus"></i>
            <input type="text" :placeholder="placeholder" v-model="model.theme" @focus="focusInt" @blur="blurInt" @input="intTaskName" @keyup.enter="createTask" />
        </div>
        <div class="action-area">
            <el-tooltip class="item" effect="dark" content="展开更多" placement="top">
                <i class="fa fa-expand" @click="dialogVisible=true"></i>
            </el-tooltip>
            <el-button :type="btnDisabled ? 'info' : 'primary'" :disabled="btnDisabled" size="mini" @click="createTask">完成</el-button>
        </div>
        <dialog-create-task :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :task-theme="model.theme" />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import dialogCreateTask from './dialogCreateTask'
export default {
    data () {
        return {
            placeholder: '添加任务',
            model: {
                theme: '',
                status: 1
            },
            isFocus: false,
            btnDisabled: true,
            isEnterTask: false,
            dialogVisible: false
        }
    },
    components: {
        dialogCreateTask
    },
    methods: {
        ...mapActions('task', ['addTask', 'getTaskList']),
        ...mapActions('log', ['addLog']),
        focusInt () {
            this.placeholder += '，回车快速创建'
            this.isFocus = true
        },
        blurInt () {
            this.placeholder = '添加任务'
            this.isFocus = false
        },
        intTaskName () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.btnDisabled = this.model.theme === ''
            }, 300)
        },
        async createTask () {
            if (!this.model.theme) return
            let obj = await this.addTask(this.model)
            this.btnDisabled = true
            await this.getTaskList()
            this.handleAddLog(obj)
        },
        handleAddLog (data) {
            let logModel = {
                masterId: data.obj,
                type: 2,
                theme: '创建了任务',
                remark: this.model.theme
            }
            this.addLog(logModel)
            this.model.theme = ''
        }
    }
}
</script>
<style lang="scss">
@mixin flex($direction: row, $justifyContent: center, $alignItems: center) {
    display: flex;
    flex-direction: $direction;
    justify-content: $justifyContent;
    align-items: $alignItems;
}
.create-task {
    width: 100%;
    height: 40px;
    @include flex(row, space-between, center);
    padding: 0 10px;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    &:hover {
        border-color: #DCDFE6;
    }
    &.active {
        border-color: #409EFF;
    }
    .input-area {
        flex: 1 1 auto;
        @include flex();
        input {
            flex: 1 1 auto;
            height: 38px;
            border: none;
            outline: none;
        }
    }
    .action-area {
        i {
            color: #909399;
            margin-right: 10px;
            font-size: 16px;
        }
    }
}
</style>
