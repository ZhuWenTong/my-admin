<template>
    <el-dialog
        append-to-body
        title="创建任务"
        v-if="visible"
        :visible.sync="visible"
        close-on-click-modal
        :show-close="false"
        width="40%"
        @opened="open"
        @close="close">
        <el-form
            @submit.native.prevent
            label-width="100px"
            ref="form"
            :model="model"
            :rules="formRule">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="任务名称" prop="theme">
                        <el-input v-model="model.theme" size="small" />
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
                        <el-select v-model="model.priority" size="small" style="width: 100%;">
                            <el-option v-for="item in priorityOption" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="model.remark" type="textarea" :autosize="{minRows: 2}" />
                    </el-form-item>
                    <el-form-item label="参与者" prop="dateTime">
                        <select-relevant @change="selectRelevant" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template slot="footer">
            <el-button type="primary" @click="submit" :loading="formLoading">完成</el-button>
        </template>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import qxStaff from '@/components/qxStaff/index'
import selectRelevant from './selectRelevant'
export default {
    props: {
        dialogVisible: Boolean,
        taskTheme: String
    },
    components: {
        qxStaff,
        selectRelevant
    },
    data () {
        return {
            visible: false,
            formLoading: false,
            model: {
                status: 1,
                theme: '',
                principal: '',
                principalName: '',
                startTime: '',
                endTime: '',
                priority: '',
                remark: '',
                relevant: '' // 任务相关人
            },
            formRule: {
                theme: [{ required: true, message: '请填写任务名称' }]
            },
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
            }]
        }
    },
    methods: {
        ...mapActions('task', ['addTask', 'getTaskList']),
        ...mapActions('log', ['addLog']),
        open () {
            this.model.theme = this.taskTheme
        },
        close () {
            this.$emit('update:dialogVisible', false)
        },
        submit () {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    let obj = await this.addTask(this.model)
                    await this.getTaskList()
                    this.handleAddLog(obj)
                    this.close()
                }
            })
        },
        handleAddLog (data) {
            let logModel = {
                masterId: data.obj,
                type: 2,
                theme: '创建了任务',
                remark: this.model.theme
            }
            this.addLog(logModel)
            this.$parent.model.theme = ''
        },
        changeStaff (data) {
            // this.model.principalName = data.name
        },
        selectTime (val) {
            this.model.startTime = (val && val.length) ? val[0] + ':00' : ''
            this.model.endTime = (val && val.length) ? val[1] + ':00' : ''
        },
        selectRelevant (data) {
            let res = data.map(i => i.id).join(',')
            this.model.relevant = ',' + res
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
