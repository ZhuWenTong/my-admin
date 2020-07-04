<template>
    <el-dialog
        append-to-body
        title="主题中心"
        v-if="visible"
        :visible.sync="visible"
        close-on-click-modal
        width="50%"
        @close="close"
        class="change-theme">
        <el-radio-group v-model="currentTheme" @change="changeTheme">
            <el-radio v-for="item in themeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
        <template slot="footer">
            <el-button size="small" type="primary">确定</el-button>
        </template>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'changeTheme',
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false,
            currentTheme: 'default',
            themeOptions: [{
                label: 'ElementUI',
                value: 'default'
            }, {
                label: '中国红',
                value: 'china'
            }, {
                label: '紫罗兰',
                value: 'purple'
            }]
        }
    },
    computed: {
        ...mapState('theme', ['systemTheme'])
    },
    methods: {
        ...mapMutations('theme', ['setSystemTheme']),
        close () {
            this.$emit('update:dialogVisible', false)
        },
        changeTheme (val) {
            this.setSystemTheme(val)
            localStorage.setItem('theme', val)
        }
    },
    created () {
        let theme = localStorage.getItem('theme') || ''
        this.currentTheme = theme
        this.setSystemTheme(theme)
    },
    watch: {
        systemTheme (val) {
            document.body.className = 'custom-' + val
        },
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss">
.change-theme {
    .fa-diamond {
        color: #909399;
    }
}
</style>
