<template>
    <div class="tool-bar">
        <el-tooltip effect="dark" :content="isFull ? '退出全屏' : '全屏'" placement="top">
            <div @click="handleFullScreen">
                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
            </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="更换布局" placement="top">
            <div @click="layoutVisible=true">
                <i class="fa fa-columns" aria-hidden="true"></i>
            </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="更换主题" placement="top">
            <div @click="themeVisible=true">
                <i class="fa fa-diamond" aria-hidden="true"></i>
            </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="注销" placement="top">
            <div @click="logout">
                <i class="el-icon-switch-button"></i>
            </div>
        </el-tooltip>
        <changeTheme :dialog-visible.sync="themeVisible" />
        <changeLayout :dialog-visible.sync="layoutVisible" />
    </div>
</template>
<script>
import screenfull from 'screenfull'
import changeTheme from '../changeTheme/index'
import changeLayout from '../changeLayout/index'
export default {
    data () {
        return {
            themeVisible: false,
            layoutVisible: false,
            isFull: false
        }
    },
    components: {
        changeTheme,
        changeLayout
    },
    methods: {
        handleFullScreen () {
            if (!screenfull.isEnabled) {
                this.$message('您的浏览器不支持全屏')
                return
            }
            screenfull.toggle()
            this.isFull = !this.isFull
        },
        logout () {
            this.$confirm('注销登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '注销成功!'
                })
                document.body.className = 'custom-default'
                this.$router.replace('/')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        }
    }
}
</script>
<style lang="scss">
.tool-bar {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    div {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        transition: all .5s cubic-bezier(.645, .045, .355, 1);
        &:hover {
            border-color: #EBEEF5;
        }
        i {
            color: #909399;
            font-size: 14px;
            transition: all .5s cubic-bezier(.645, .045, .355, 1);
        }
    }
}
</style>
