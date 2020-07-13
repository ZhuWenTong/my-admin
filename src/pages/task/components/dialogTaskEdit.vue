<template>
    <el-dialog
        append-to-body
        v-if="visible"
        :visible.sync="visible"
        close-on-click-modal
        width="70%"
        @open="open"
        @close="close"
        class="dialog-task-edit">
        <template slot="title">
            <div class="dialog-header">
                <span class="title">任务</span>
                <div class="actions">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </template>
        <el-row style="border-top: 1px solid #E4E7ED;">
            <el-col :span="10" style="border-right: 1px solid #E4E7ED;padding: 10px 10px 50px 0;">
                <el-form
                    @submit.native.prevent
                    label-width="100px"
                    ref="form"
                    :model="model">
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="model.status" size="small" @change="changeStatus">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务名称" prop="theme">
                        <el-input v-model="model.theme" size="small" @blur="changeTheme" />
                    </el-form-item>
                    <el-form-item label="负责人" prop="principal">
                        <qx-staff v-model="model.principal" @change="changeStaff" :queryName="model.principalName" placeholder="请输入用户名称搜索" url="/system/user/select" />
                    </el-form-item>
                    <el-form-item label="时间" prop="dateTime">
                        <el-date-picker
                            v-model="dateTime"
                            type="datetimerange"
                            range-separator="~"
                            start-placeholder="设置开始日期"
                            end-placeholder="设置截止日期"
                            size="small"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            @change="selectTime"
                            style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="优先级" prop="priority">
                        <el-select v-model="model.priority" size="small" style="width: 100%;" @change="changePriority">
                            <el-option v-for="item in priorityOption" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="model.remark" type="textarea" :autosize="{minRows: 2}" @blur="changeRemark" />
                    </el-form-item>
                    <el-form-item label="参与者" prop="dateTime">
                        <select-relevant @change="selectRelevant" :already-list="model.relevantNames" :value-map="{id: 'id', name: 'name'}" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="14" style="padding-top: 10px;">
                <log-container :master-id="model.id" />
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import qxStaff from '@/components/qxStaff/index'
import selectRelevant from './selectRelevant'
import logContainer from './logContainer/index'
export default {
    props: {
        dialogVisible: Boolean,
        data: Object,
        requestParams: Object
    },
    data () {
        return {
            visible: false,
            statusOptions: [{
                label: '未完成',
                value: 1
            }, {
                label: '完成',
                value: 0
            }],
            model: {},
            dateTime: [],
            priorityOption: [{
                label: '较低',
                value: 1
            }, {
                label: '普通',
                value: 2
            }, {
                label: '紧急',
                value: 3
            }, {
                label: '非常紧急',
                value: 4
            }],
            logModel: {
                masterId: '',
                type: 2,
                theme: '', // 操作主题 创建了任务/更新任务/完成任务/重做任务
                remark: '' // 操作内容
            },
            prevTheme: '',
            prevRemark: ''
        }
    },
    components: {
        qxStaff,
        selectRelevant,
        logContainer
    },
    methods: {
        ...mapActions('task', ['deleteTask', 'getTaskList', 'editTask']),
        ...mapActions('log', ['addLog', 'getLogList']),
        async open () {
            let data = JSON.parse(JSON.stringify(this.data))
            data.priority = data.priority || ''
            this.model = data
            this.dateTime = data.startTime ? [data.startTime, data.endTime] : []
            this.logModel.masterId = data.id
            this.prevTheme = data.theme
            this.prevRemark = data.remark
            await this.$nextTick()
            setTimeout(() => {
                let ele = document.querySelector('.log-container .main')
                ele.scrollTop = ele.scrollHeight
            }, 500)
        },
        close () {
            this.$emit('update:dialogVisible', false)
        },
        changeStatus (val) {
            let theme = val === 0 ? '完成了任务' : '重做了任务'
            let params = {
                theme
            }
            this.beforeEdit(params)
        },
        changeTheme () {
            if (this.model.theme === this.prevTheme) return
            if (!this.model.theme) {
                this.model.theme = this.prevTheme
                return
            }
            let params = {
                theme: '更新了任务名称',
                remark: this.model.theme
            }
            this.beforeEdit(params)
        },
        changeStaff (data) {
            this.model.principalName = data ? data.empName : ''
            let params = {
                theme: data ? '更新了负责人' : '移除了负责人',
                remark: data ? data.empName : ''
            }
            this.beforeEdit(params)
        },
        handleCommand (val) {
            if (val === 'delete') {
                this.$confirm('确定要删除任务吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.confirmDelete()
                }).catch(err => {})
            }
        },
        confirmDelete () {
            let _this = this
            let { id } = this.data
            let params = {
                ids: [id]
            }
            this.deleteTask(params).then(res => {
                _this.getTaskList(_this.requestParams)
                _this.close()
            })
        },
        selectTime (val) {
            this.model.startTime = (val && val.length) ? val[0] + ':00' : ''
            this.model.endTime = (val && val.length) ? val[1] + ':00' : ''
            let params = {
                theme: '更新了时间',
                remark: `开始时间为${val[0]}，截止时间为${val[1]}`
            }
            this.beforeEdit(params)
        },
        changePriority (val) {
            let obj = this.priorityOption.find(i => i.value === val)
            let params = {
                theme: val ? '更新了优先级' : '移除了优先级',
                remark: val ? obj.label : ''
            }
            this.beforeEdit(params)
        },
        changeRemark () {
            if (this.model.remark === this.prevRemark) return
            let params = {
                theme: '更新了备注',
                remark: this.model.remark
            }
            this.beforeEdit(params)
        },
        selectRelevant (data) {
            let res = data.map(i => i.id).join(',')
            let names = data.map(i => i.empName).join('、')
            this.model.relevant = ',' + res
            let params = {
                theme: data ? '更新了参与人' : '移除了参与人',
                remark: data ? names : ''
            }
            this.beforeEdit(params)
        },
        beforeEdit (params) {
            this.handleEdit()
            this.handleAddLog(params)
            this.prevTheme = this.model.theme
            this.prevRemark = this.model.remark
        },
        async handleEdit () {
            await this.editTask(this.model)
            await this.getTaskList(this.requestParams)
        },
        // 新增日志
        async handleAddLog (params) {
            let { masterId } = this.logModel
            let addLogModel = {
                ...params,
                masterId,
                type: 2
            }
            await this.addLog(addLogModel)
            await this.getLogList({masterId})
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
                if (val) {
                    this.open()
                }
            },
            immediate: true
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
.dialog-task-edit {
    .el-dialog__headerbtn {
        top: 25px;
    }
    .dialog-header {
        margin-right: 40px;
        @include flex(row, space-between, center);
        .title {
            line-height: 24px;
            font-size: 18px;
            color: #303133;
        }
        .actions {
            width: 28px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            transition: border-color .5s cubic-bezier(.645, .045, .355, 1);
            i {
                color: #909399;
                transition: border-color .5s cubic-bezier(.645, .045, .355, 1);
                display: inline-block;
                width: 28px;
                height: 28px;
                line-height: 28px;
                text-align: center;
            }
            &:hover {
                background: #ecf6fe;
                i {
                    color: #409EFF;
                }
            }
        }
    }
    .footer {
        @include flex(row, flex-end, center);
    }
}
</style>
