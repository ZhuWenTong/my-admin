<template>
    <el-dialog
        append-to-body
        title="编辑评论"
        v-if="visible"
        :visible.sync="visible"
        close-on-click-modal
        :show-close="false"
        width="40%"
        @opened="open"
        @close="close">
        <el-input v-model="model.remark" type="textarea" :autosize="{minRows: 3}" />
        <el-button slot="footer" @click="save" type="primary">保存</el-button>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        dialogVisible: Boolean,
        model: Object
    },
    data () {
        return {
            visible: false
        }
    },
    methods: {
        ...mapActions('log', ['editLog', 'getLogList']),
        open () {},
        close () {
            this.$emit('update:dialogVisible', false)
        },
        async save () {
            let { masterId } = this.model
            await this.editLog(this.model)
            this.getLogList({masterId})
            this.close()
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
