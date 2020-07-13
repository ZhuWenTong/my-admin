<template>
    <div class="dialog-staff" v-if="visible">
        <i class="el-icon-close" @click="close"></i>
        <el-input v-model="queryName" @input="search" placeholder="请输入用户名称搜索" clearable />
        <div class="staff-container">
            <div v-for="item in list" :key="item.id" @click="selectItem(item)">
                <el-checkbox v-model="item.checked" @change="selectItem(item)" />
                <span>{{item.empName}}</span>
            </div>
        </div>
        <div class="select-staff">
            <p v-show="selectedList.length">{{selectedList.length}} 个参与者</p>
            <div>
                <span v-for="item in selectedList" :key="item.id">{{item.empName}}</span>
            </div>
        </div>
        <div class="footer">
            <el-button @click="submit" type="primary" style="width: 100%;">确定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean,
        alreadyList: Array
    },
    data () {
        return {
            list: [],
            visible: false,
            queryName: '',
            selectedList: []
        }
    },
    methods: {
        init () {
            this.selectedList = JSON.parse(JSON.stringify(this.alreadyList))
        },
        close () {
            this.queryName = ''
            this.list = []
            this.$emit('update:dialogVisible', false)
        },
        search () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.requestStaff()
            }, 300)
        },
        requestStaff () {
            if (!this.queryName) {
                this.list = []
                return
            }
            let params = {
                searchName: this.queryName
            }
            this.postRequest('/system/user/select', params).then(res => {
                this.list = res.obj.data || []
                if (this.list.length) {
                    this.handlerChecked()
                }
            })
        },
        handlerChecked () {
            if (this.selectedList.length) {
                this.selectedList.forEach(i => {
                    let obj = this.list.find(j => j.id === i.id)
                    if (obj) {
                        this.$set(obj, 'checked', true)
                    }
                })
            }
        },
        selectItem (item) {
            this.$set(item, 'checked', !item.checked)
            if (item.checked) {
                this.selectedList.push(item)
            } else {
                let idx = this.selectedList.findIndex(i => i.id === item.id)
                this.selectedList.splice(idx, 1)
            }
        },
        submit () {
            this.$emit('change', this.selectedList)
            this.close()
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
                if (val) {
                    this.init()
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss">
.dialog-staff {
    width: 250px;
    height: 400px;
    background: #fff;
    padding: 30px 10px 10px 10px;
    position: relative;
    .el-icon-close {
        font-size: 16px;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
    .staff-container {
        height: 170px;
        overflow: auto;
        margin: 10px 0;
        div {
            padding-left: 10px;
            cursor: pointer;
            transition: all .2s cubic-bezier(.645, .045, .355, 1);
            &:hover {
                background: #f8f8f8;
            }
            .el-checkbox {
                margin-right: 10px;
            }
        }
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
    .select-staff {
        height: 80px;
        p {
            line-height: 20px;
            margin-bottom: 0;
        }
        div {
            height: 60px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            span {
                margin-right: 4px;
                cursor: pointer;
            }
        }
    }
    .footer {
        padding-top: 10px;
    }
}
</style>
