<template>
    <el-dialog
        append-to-body
        title="布局"
        v-if="visible"
        :visible.sync="visible"
        close-on-click-modal
        width="500px"
        @close="close"
        class="change-layout">
        <el-table :data="layoutList" border :show-header="false">
            <el-table-column prop="name"></el-table-column>
            <el-table-column width="150" align="center">
                <template slot-scope="props">
                    <el-button @click="clickBtn(props.row)"
                        :type="props.row.value === currentLayout.value ? 'success': ''"
                        :icon="props.row.value === currentLayout.value ? 'el-icon-check': ''"
                        round>
                        {{props.row.value === currentLayout.value ? '已激活' : '使用'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'changeLayout',
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false,
            currentLayout: {
                name: '上下布局',
                value: 'topMenu',
            },
            layoutList: [{
                name: '上下布局',
                value: 'topMenu'
            }, {
                name: '左右布局',
                value: 'leftMenu'
            }]
        }
    },
    computed: {
        ...mapState('layout', ['layoutData'])
    },
    methods: {
        ...mapMutations('layout', ['changeLayout']),
        close () {
            this.$emit('update:dialogVisible', false)
        },
        clickBtn (item) {
            this.currentLayout = item
            this.changeLayout(item)
            localStorage.setItem('layout', JSON.stringify(item))
        }
    },
    created () {
        let defaultMenu = {
            name: '上下布局',
            value: 'topMenu'
        }
        let layout = JSON.parse(localStorage.getItem('layout')) || defaultMenu
        this.currentLayout = layout
        this.changeLayout(this.currentLayout)
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
