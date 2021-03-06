<template>
    <div class="cascader-panel">
        <div class="panel-main">
            <div v-for="item in data" :key="item[valueMap.value]" class="panel-parent">
                <div
                    @click="handleClick(item)"
                    @mouseenter="handleEnter(item)"
                    class="panel-content"
                    :class="{'active': item[valueMap.value] === activeId || item[valueMap.value] === hoverId}">
                    <span>{{item[valueMap.label]}}</span>
                    <i v-if="item[valueMap.children] && item[valueMap.children].length" class="el-icon-arrow-right"></i>
                </div>
                <div
                    v-if="item[valueMap.children] &&
                        item[valueMap.children].length &&
                        showChildCascader &&
                        (item[valueMap.value] === activeId || item[valueMap.value] === hoverId)"
                    class="panel-son">
                    <cascader-panel
                        :data="item[valueMap.children]"
                        @change="change"
                        :path="currentPath"
                        :value-map="valueMap"
                        :expand-trigger="expandTrigger" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cascaderPanel from './cascaderPanel'
export default {
    name: 'cascaderPanel',
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        path: [Array, String],
        valueMap: Object,
        expandTrigger: String
    },
    data () {
        return {
            activeId: '',
            currentPath: '',
            hoverId: '',
            showChildCascader: true
        }
    },
    methods: {
        init () {
            if (this.path && this.path.length) {
                this.activeId = this.path[0]
                this.currentPath = this.path.slice(1, this.path.length)
            } else {
                this.activeId = ''
                this.currentPath = ''
            }
        },
        handleClick (item) {
            this.activeId = item[this.valueMap.value]
            this.$emit('change', item)
            if (this.expandTrigger === 'hover') {
                let dom = this.$parent
                this.findCascaderParent(dom)
            }
        },
        handleEnter (item) {
            if (this.expandTrigger !== 'hover') return
            this.hoverId = item[this.valueMap.value]
            if (item.children && item.children.length) {
                this.showChildCascader = true
            } else {
                this.showChildCascader = false
            }
        },
        change (data) {
            this.$emit('change', data)
        },
        findCascaderParent (dom) {
            if (dom.$el.className === 'qx-cascader') {
                dom.visible = false
            } else {
                let p = dom.$parent
                this.findCascaderParent(p)
            }
        }
    },
    components: {
        cascaderPanel
    },
    watch: {
        path: {
            handler (val) {
                this.init()
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
.cascader-panel {
    .panel-main {
        @include scrollbar;
        height: 200px;
        overflow: auto;
        background: #ffffff;
        border: 1px solid #E4E7ED;
    }
    .panel-content {
        @include flex(row, space-between, center);
        cursor: pointer;
        padding: 0 10px;
        line-height: 40px;
        color: #606266;
        &:hover {
            background: #F5F7FA;
        }
        &.active {
            color: #409EFF;
            font-weight: bold;
        }
    }
    .panel-parent {
        min-width: 200px;
        .panel-son {
            position: absolute;
            left: 100%;
            top: 0;
            .cascader-panel {
                transform: translateX(-1px);
                background: #fff;
                .panel-main {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    padding: 4px 0;
                }
            }
        }
    }
}
</style>
