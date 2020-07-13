<template>
    <div class="msg">
        <div class="msg-header">
            <span>通知</span>
        </div>
        <div class="msg-main">
            <template v-if="newList && newList.length">
                <msg-item v-for="item in newList" :key="item.id" :data="item" />
            </template>
            <div v-else class="no-data">
                <img :src="noMsgImg" />
                <span>暂无新的通知</span>
            </div>
        </div>
        <div class="msg-footer" @click="openNotify">查看更多</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import msgItem from './msgItem'
export default {
    computed: {
        ...mapGetters('message', ['newList'])
    },
    components: {
        msgItem
    },
    data () {
        return {
            noMsgImg: require('@/assets/img/no-msg.png')
        }
    },
    methods: {
        openNotify () {
            this.$router.push({
                name: 'notification'
            })
            this.$parent.visible = false
        }
    }
}
</script>
<style lang="scss">
.msg {
    .msg-header {
        padding-left: 20px;
        line-height: 40px;
        color: #303133;
        border-bottom: 1px solid #EBEEF5;
    }
    .msg-main {
        .msg-item:last-child {
            border-bottom: none;
        }
        .no-data {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #C0C4CC;
            img {
                height: 100px;
            }
        }
    }
    .msg-footer {
        text-align: center;
        line-height: 40px;
        border-top: 1px solid #EBEEF5;
        cursor: pointer;
        color: #409EFF;
    }
}
</style>