<template>
    <div class="message-entry" ref="msgContent">
        <el-badge :value="count" v-show="count">
            <div class="bell">
                <i class="el-icon-bell" @click="openNotify"></i>
            </div>
        </el-badge>
        <i class="el-icon-bell" @click="openNotify" v-show="!count"></i>
        <div class="message-content" v-show="visible">
            <msg />
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import webSocket from '@/utils/websocket'
import msg from './msg'
export default {
    data () {
        return {
            visible: false
        }
    },
    mixins: [webSocket],
    computed: {
        ...mapGetters('message', ['count'])
    },
    components: {
        msg
    },
    methods: {
        ...mapActions('message', ['getMsgList']),
        openNotify () {
            this.visible = true
        },
        getWebSocketData () {
            this.getMsgList()
            window.addEventListener('onmessageWS', this.getDataFunc)
        },
        getDataFunc (e) {
            console.log(e)
            // const data = JSON.parse(e.detail.data.data)
            if (e.detail.data.data === 'r') {
                this.$notify({
                    title: '提示',
                    message: '收到一条消息',
                    duration: '3000'
                })
            }
            this.getMsgList().then().catch(err => {
                clearInterval(this.timer)
                this.webSocket.close()
            })
        },
        closeBox (e) {
            let { msgContent } = this.$refs
            if (msgContent && !msgContent.contains(e.target)) {
                this.visible = false
	        }
        }
    },
    created () {
        this.getWebSocketData()
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
.message-entry {
    display: inline-block;
    color: #ffffff;
    cursor: pointer;
    position: relative;
    .bell {
        width: 32px;
        text-align: center;
    }
    .message-content {
        position: absolute;
        top: 100%;
        right: 0;
        width: 300px;
        background: #fff;
        z-index: 100;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
        transform: translate(10px, 10px);
        &::before {
            box-sizing: content-box;
            width: 0px;
            height: 0px;
            position: absolute;
            top: -15px;
            right: 10px;
            padding: 0;
            border-bottom: 8px solid #FFFFFF;
            border-top: 8px solid transparent;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            display: block;
            content: '';
            z-index: 200;
        }
        &::after {
            box-sizing: content-box;
            width: 0px;
            height: 0px;
            position: absolute;
            top: -17px;
            right: 9px;
            padding: 0;
            border-bottom: 9px solid #E4E7ED;
            border-top: 9px solid transparent;
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            display: block;
            content: '';
            z-index: 150;
        }
    }
}
</style>
