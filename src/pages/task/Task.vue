<template>
    <div class="my-task">
        <el-tabs v-model="currentName" @tab-click="loadData">
            <el-tab-pane label="与我相关" name="0"></el-tab-pane>
            <el-tab-pane label="我发起的" name="1"></el-tab-pane>
            <el-tab-pane label="我负责的" name="2"></el-tab-pane>
            <el-tab-pane label="我参与的" name="3"></el-tab-pane>
        </el-tabs>
        <div class="filter-area">
            <el-select v-model="params.status" @change="loadData" size="mini" placeholder="任务状态">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="task-container">
            <task-container :requestParams="params" />
            <page-ination v-if="listCount > 0" :queryParam="params" :totalCount="listCount" @getList="loadData" />
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import taskContainer from './subPages/taskContainer'
import pageInation from '@/components/pageInation/pageInation'
export default {
    props: {
        requestParams: Object
    },
    data () {
        return {
            statusOptions: [{
                label: '未完成',
                value: 1
            }, {
                label: '已完成',
                value: 0
            }, {
                label: '已逾期',
                value: 2
            }],
            currentName: '0',
            params: {
                pageNo: 1,
                pageSize: 10,
                getScope: 0, // 0, 1, 2, 3
                status: 1
            }
        }
    },
    computed: {
        ...mapState('task', ['listCount'])
    },
    components: {
        taskContainer,
        pageInation
    },
    methods: {
        ...mapActions('task', ['getTaskList']),
        init () {
            this.loadData()
        },
        loadData () {
            this.params.getScope = parseInt(this.currentName)
            this.getTaskList(this.params)
        }
    },
    created () {
        this.init()
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
.my-task {
    padding-left: 15px;
    position: relative;
    .filter-area {
        height: 40px;
        position: absolute;
        right: 0;
        top: 0;
        @include flex();
        .el-select {
            width: 100px;
        }
    }
}
</style>
