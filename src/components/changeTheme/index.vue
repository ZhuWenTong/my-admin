<template>
    <el-dialog
        append-to-body
        title="主题中心"
        v-if="visible"
        :visible.sync="visible"
        close-on-click-modal
        width="500px"
        @close="close"
        class="change-theme">
        <el-table :data="themeData" border :show-header="false">
            <el-table-column prop="name">
                <template slot-scope="props">
                    <span :style="{color: props.row.color}">{{props.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150" align="center">
                <template slot-scope="props">
                    <el-button @click="changeTheme(props.row)"
                        :type="props.row.value === systemTheme.value ? 'success': ''"
                        :icon="props.row.value === systemTheme.value ? 'el-icon-check': ''"
                        round>
                        {{props.row.value === systemTheme.value ? '已激活' : '使用'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
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
            themeData: [{
                name: 'ElementUI',
                value: 'default',
                color: '#409EFF'
            }, {
                name: '中国红',
                value: 'china',
                color: 'red'
            }, {
                name: '紫罗兰',
                value: 'purple',
                color: '#FF40F5'
            }, {
                name: 'Success',
                value: 'success',
                color: '#67C23A'
            }, {
                name: '夜间模式',
                value: 'dark',
                color: '#304457'
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
        changeTheme (item) {
            this.setSystemTheme(item)
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    }
}
</script>
