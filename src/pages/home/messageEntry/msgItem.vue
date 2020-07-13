<template>
    <div class="msg-item" @click="openNotify" :class="{'is-new': data.isRead === 1}">
        <p class="con"><i></i>{{data.content}}</p>
        <p>{{data.sendTime}}</p>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        data: Object
    },
    methods: {
        ...mapActions('message', ['getMsgList', 'readMsg']),
        openNotify () {
            this.$router.push({
                name: 'notification',
                params: {
                    id: this.data.id
                }
            })
            this.read()
        },
        async read () {
            let params = {
                idList: [this.data.id]
            }
            await this.readMsg(params)
            await this.getMsgList()
            this.$parent.$parent.visible = false
        }
    }
}
</script>
<style lang="scss">
.msg-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
    p {
        color: #909399;
        margin: 0;
        &.tit {
            color: #303133;
        }
        &.con {
            i {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #F56C6C;
                margin-right: 4px;
            }
        }
    }
    &:hover {
        background: #EBEEF5;
    }
    &.is-new {
        p {
            color: #303133;
        }
    }
}
</style>
