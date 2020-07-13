<template>
    <div class="task-item">
        <div class="theme">
            <p>{{data.theme}}</p>
            <el-link :type="deadlineObj.type" :underline="false">{{deadlineObj.text}}</el-link>
        </div>
        <div class="detail">
            <el-tag v-if="priorityObj" :type="priorityObj.type" size="mini">{{priorityObj.text}}</el-tag>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Object
    },
    computed: {
        // 紧急程度
        priorityObj () {
            let priority = this.data.priority
            let obj = priority === 1 ? {
                type: 'info',
                text: '较低'
            } : priority === 2 ? {
                type: 'primary',
                text: '普通'
            } : priority === 3 ? {
                type: 'warning',
                text: '紧急'
            } : priority === 4 ? {
                type: 'danger',
                text: '非常紧急'
            } : null
            return obj
        },
        // 截止时间
        deadlineObj () {
            let endTime = this.data.endTime
            if (!endTime) {
                return {
                    type: 'info',
                    text: ''
                }
            }
            if (this.data.status === 0) { // 已完成
                return {
                    type: 'info',
                    text: this.formatDate(endTime) + ' 截止'
                }
            }
            if (this.isOverdue(endTime)) {
                return {
                    type: 'danger',
                    text: '已逾期'
                }
            }
            if (this.isToday(endTime)) {
                return {
                    type: 'warning',
                    text: '今天截止'
                }
            }
            return {
                type: 'primary',
                text: this.getWeek(endTime) + ' 截止'
            }
        }
    },
    methods: {
        isToday (day) {
            var d = new Date(day.replace(/-/g, '/'))
            var todaysDate = new Date()
            return d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
        },
        // 已逾期
        isOverdue (day) {
            let now = new Date().getTime()
            let time = new Date(day).getTime()
            return now > time
        },
        getWeek (day) {
            let week = ['日', '一', '二', '三', '四', '五', '六']
            let idx = new Date(day).getDay()
            return `周${week[idx]}`
        },
        formatDate (day) {
            let month = new Date(day).getMonth() + 1
            let date = new Date(day).getDate()
            return `${month}月${date}日`
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
.task-item {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 1px solid #E4E7ED;
    transition: all .5s cubic-bezier(.645, .045, .355, 1);
    &:hover {
        background: #DCDFE6;
    }
    .theme {
        @include flex(row, space-between, center);
    }
    p {
        margin: 0;
    }
}
</style>
