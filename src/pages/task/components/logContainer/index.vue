<template>
    <div class="log-container">
        <p class="all">所有动态</p>
        <div class="main">
            <log-item v-for="item in logList" :key="item.id" :data="item" />
        </div>
        <div class="commit">
            <el-input type="textarea" :autosize="{minRows: 4, maxRows: 4}" placeholder="按 Ctrl + Enter 快速发布" v-model="model.remark" @keyup.ctrl.enter.native="createTask" />
            <el-button type="text" class="btn" @click="createTask">发布</el-button>
        </div>
        <log-edit :dialogVisible.sync="logEditVisible" :model="logEditModel"  />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import logItem from './logItem'
import logEdit from './logEdit'
export default {
    props: {
        masterId: [String, Number]
    },
    data () {
        return {
            model: {
                remark: '',
                type: 6 // 评论
            },
            logEditVisible: false,
            logEditModel: {}
        }
    },
    components: {
        logItem,
        logEdit
    },
    computed: {
        ...mapState('log', ['logList', 'logLoading'])
    },
    methods: {
        ...mapActions('log', ['addLog', 'getLogList']),
        init () {
            let params = {
                masterId: this.masterId
            }
            this.getLogList(params)
        },
        async createTask () {
            let { remark } = this.model
            if (!remark || remark.trim() === '') return
            let logModel = {
                ...this.model,
                theme: '',
                masterId: this.masterId
            }
            await this.addLog(logModel)
            await this.getLogList({masterId: this.masterId})
            this.model.remark = ''
            let ele = document.querySelector('.log-container .main')
            ele.scrollTop = ele.scrollHeight
        }
    },
    created () {
        this.init()
    }
}
</script>
<style lang="scss">
@mixin scrollbar {
    &::-webkit-scrollbar-track-piece {
        background-color:#f8f8f8;
        border-radius: 4px;
    }
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color:#dddddd;
        background-clip: padding-box;
        min-height: 28px;
        border-radius: 4px;
    }
}
.log-container {
    p.all {
        line-height: 30px;
        margin-bottom: 10px;
        text-indent: 10px;
    }
    .main {
        height: 350px;
        overflow: auto;
        transition: all 2s cubic-bezier(.645, .045, .355, 1);
        @include scrollbar;
    }
    .commit {
        margin-top: 10px;
        border-top: 1px solid #E4E7ED;
        height: 95px;
        position: relative;
        .el-textarea__inner {
            border: none;
            resize: none;
            font-family: Arial, Helvetica, sans-serif;
            @include scrollbar;
        }
        .btn {
            position: absolute;
            right: 10px;
            bottom: 0;
        }
    }
}
</style>
