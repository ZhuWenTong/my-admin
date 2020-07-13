<template>
    <div class="select-relevant" ref="selectRelevant">
        <div v-for="item in list" :key="item.id" class="relevant">
            <el-tooltip effect="dark" :content="item.empName" placement="top">
                <span>{{item.empName.charAt(0)}}</span>
            </el-tooltip>
            <i class="fa fa-times-circle" @click.stop="deleteItem(item)"></i>
        </div>
        <div class="wrap-plus">
            <el-tooltip effect="dark" content="添加参与者" placement="top">
                <i class="el-icon-plus" @click="addRelevant"></i>
            </el-tooltip>
        </div>
        <div class="wrap-staff">
            <dialog-staff :dialogVisible.sync="staffVisible" @change="handleSelectStaff" :already-list="list" />
        </div>
    </div>
</template>
<script>
import dialogStaff from './dialogStaff'
export default {
    props: {
        alreadyList: {
            type: Array,
            default () {
                return []
            }
        },
        valueMap: {
            type: Object,
            default () {
                return {
                    name: 'empName',
                    id: 'id'
                }
            }
        }
    },
    data () {
        return {
            list: [],
            staffVisible: false
        }
    },
    components: {
        dialogStaff
    },
    methods: {
        init () {
            let arr = []
            if (this.alreadyList && this.alreadyList.length) {
                this.alreadyList.forEach(i => {
                    arr.push({
                        id: i[this.valueMap.id],
                        empName: i[this.valueMap.name]
                    })
                })
            }
            this.list = arr
        },
        deleteItem (item) {
            let idx = this.list.findIndex(i => i.id === item.id)
            this.list.splice(idx, 1)
            this.$emit('change', this.list)
        },
        addRelevant () {
            this.staffVisible = true
        },
        handleSelectStaff (data) {
            this.list = data
            this.$emit('change', data)
        },
        closeBox (e) {
            let { selectRelevant } = this.$refs
            if (selectRelevant && !selectRelevant.contains(e.target)) {
                this.staffVisible = false
	        }
        }
    },
    created () {
        this.init()
    },
    mounted () {
        this.$nextTick(function() {
            document.addEventListener('click', e => {
                this.closeBox(e)
            })
        })
    },
    beforeDestroy () {
        document.removeEventListener('click', e => {
            this.closeBox(e)
        })
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
@mixin common {
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    background: #409EFF;
    color: #ffffff;
    cursor: pointer;
    box-sizing: border-box;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
}
.select-relevant {
    @include flex(row, flex-start, center);
    flex-wrap: wrap;
    position: relative;
    .relevant {
        @include common();
        margin-right: 8px;
        position: relative;
        line-height: 22px;
        border: 1px solid transparent;
        transition: all .2s cubic-bezier(.645, .045, .355, 1);
        i.fa-times-circle {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 12px;
            color: #ccc;
            display: none;
            transition: all .2s cubic-bezier(.645, .045, .355, 1);
            &:hover {
                color: #F56C6C;
            }
        }
        &:hover {
            border: 1px solid #ccc;
            .fa-times-circle {
                display: block;
            }
        }
    }
    .wrap-plus {
        position: relative;
        i.el-icon-plus {
            display: inline-block;
            @include common();
            &:hover {
                background: #0171c2;
            }
        }
    }
    .wrap-staff {
        position: absolute;
        top: -400px;
        left: -125px;
        z-index: 3000;
        border-radius: 4px;
        box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .5);
        &::after {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: 0;
            left: 30%;
            border-width: 10px 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent #ffffff;
            transform: translate(20px, 6px) rotate(45deg);
        }
    }
}
</style>
