<template>
    <div class="notification">
        <el-collapse v-model="activeName" accordion @change="handlerChange" v-if="list && list.length">
            <el-collapse-item v-for="item in list" :key="item.id" :name="item.id" :class="{'is-new': item.isRead === 1}">
                <template slot="title">
                    <div class="tit">
                        <div>
                            <i v-show="item.isRead === 1"></i>
                            <span>{{item.sendTime}}</span>
                        </div>
                        <div class="del">
                            <span class="el-icon-delete" @click.prevent.stop="delMsg(item)"></span>
                        </div>
                    </div>
                </template>
                <div class="content">{{item.content}}</div>
            </el-collapse-item>
        </el-collapse>
        <div v-else class="no-msg">
            <img :src="noMsgImg" />
            <span>暂无通知</span>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            activeName: '',
            noMsgImg: require('@/assets/img/no-msg.png')
        }
    },
    computed: {
        ...mapState('message', ['list'])
    },
    methods: {
        ...mapActions('message', ['getMsgList', 'readMsg', 'deleteMsg']),
        handlerChange () {
            if (!this.activeName) return
            let currentMsg = this.list.find(i => i.id === this.activeName)
            if (currentMsg.isRead === 2) return
            this.read()
        },
        async read () {
            let params = {
                idList: [this.activeName]
            }
            await this.readMsg(params)
            await this.getMsgList()
        },
        async delMsg (item) {
            let params = {
                idList: [item.id]
            }
            await this.deleteMsg(params)
            await this.getMsgList()
        }
    },
    created () {
        this.activeName = this.$route.params.id
    }
}
</script>
<style lang="scss">
.notification {
    .tit {
        width: 100%;
        color: #909399;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        i {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #F56C6C;
            margin-right: 4px;
        }
        .del {
            margin-right: 20px;
            display: none;
            span {
                color: #303133;
                &:hover {
                    color: #F56C6C;
                }
            }
        }
        &:hover {
            .del {
                display: block;
            }
        }
    }
    .content {
        color: #909399;
    }
    .is-new {
        .tit,
        .content {
            color: #303133;
        }
    }
    .no-msg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            height: 100px;
        }
    }
}
</style>
