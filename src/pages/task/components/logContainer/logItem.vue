<template>
    <div class="log-item">
        <div class="left">
            <i class="el-icon-edit"></i>
        </div>
        <div class="right">
            <div class="create">
                <div class="c-left">
                    <span>{{data.createName}}{{data.theme}}</span>
                    <div v-if="data.type === 6 && !isMoreThreeMins(data.createDate)" class="c-action">
                        <span @click="handleEdit">编辑</span>
                        <span @click="handleDelLog">删除</span>
                    </div>
                </div>
                <el-tooltip effect="dark" :content="translateTime" placement="top">
                    <span class="c-time">{{getDateDiff(data.createDate)}}</span>
                </el-tooltip>
            </div>
            <p class="content">{{data.remark}}</p>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
    props: {
        data: Object
    },
    data () {
        return {
            model: {}
        }
    },
    computed: {
        translateTime () {
            return moment(this.data.createDate).format('YYYY年MM月DD HH:mm')
        }
    },
    methods: {
        ...mapActions('log', ['deleteLog', 'getLogList']),
        getDateTimeStamp (dateStr) {
            return Date.parse(dateStr.replace(/-/gi, '/'))
        },
        getDateDiff (dateStr) {
            var publishTime = this.getDateTimeStamp(dateStr) / 1000,
                d_seconds,
                d_minutes,
                d_hours,
                d_days,
                timeNow = parseInt(new Date().getTime() / 1000),
                d,
                date = new Date(publishTime * 1000),
                Y = date.getFullYear(),
                M = date.getMonth() + 1,
                D = date.getDate(),
                H = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
            H = H < 10 ? `0${H}` : H
            m = m < 10 ? `0${m}` : m

            d = timeNow - publishTime
            d_days = parseInt(d / 86400)
            d_hours = parseInt(d / 3600)
            d_minutes = parseInt(d / 60)
            d_seconds = parseInt(d)

            if (d_days === 1) {
                return `昨天 ${H}:${m}`
            } else if (d_days <= 0 && d_hours > 0) {
                if (d_hours === 1) {
                    return d_hours + '小时前'
                } else {
                    return `今天 ${H}:${m}`
                }
            } else if (d_hours <= 0 && d_minutes > 0) {
                return d_minutes + '分钟前'
            } else if (d_seconds < 60) {
                if (d_seconds <= 0) {
                    return '刚刚发表'
                } else {
                    return d_seconds + '秒前'
                }
            } else if (d_days >= 2 && d_days < 30) {
                return `${M}月${D}日 ${H}:${m}`
            } else if (d_days >= 30) {
                return `${Y}年${M}月${D}日 ${H}:${m}`
            }
        },
        // 是否超过3分钟
        isMoreThreeMins (dateStr) {
            let timeStamp = new Date(dateStr).getTime()
            let now = Date.now()
            return now - timeStamp > 3 * 60 * 1000
        },
        handleDelLog () {
            this.$confirm('确定要删除日志吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(async () => {
                let { id, masterId } = this.data
                await this.deleteLog({id})
                this.getLogList({masterId})
            })
        },
        handleEdit () {
            this.model = this.data
            this.$set(this.model, 'type', 2)
            this.$parent.logEditVisible = true
            this.$parent.logEditModel = this.model
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
.log-item {
    overflow: hidden;
    .left {
        width: 50px;
        float: left;
        text-align: center;
        i {
            line-height: 30px;
            font-size: 16px;
            color: #909399;
        }
    }
    .right {
        margin-left: 50px;
        padding-right: 10px;
        .create {
            color: #909399;
            @include flex(row, space-between, center);
            .c-left {
                @include flex(row, flex-start, center);
            }
            .c-action {
                display: none;
                span {
                    margin-left: 10px;
                    cursor: pointer;
                    &:hover {
                        color: #409EFF;
                    }
                }
            }
            .c-time {
                font-size: 12px;
            }
        }
        p {
            font-size: 12px;
            &.content {
                color: #303133;
                white-space: pre-line;
            }
        }
    }
    &:hover {
        .right .create .c-action {
            display: block;
        }
    }
}
</style>
