<template>
    <div class="admin-index">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">{{item.name}}</el-menu-item>
        </el-menu>
        <div class="action-bar">
            <el-tooltip effect="dark" content="更换主题" placement="top">
                <i class="fa fa-diamond" aria-hidden="true" @click="visible=true"></i>
            </el-tooltip>
        </div>
        <router-view></router-view>
        <changeTheme :dialog-visible.sync="visible" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import changeTheme from '../../components/changeTheme/index'
export default {
    data () {
        return {
            activeIndex: '/home',
            visible: false
        }
    },
    computed: {
        ...mapState('menus', ['menuList'])
    },
    components: {
        changeTheme
    },
    methods: {
        ...mapActions('menus', ['getMenuList']),
        init () {
            this.getMenuList()
        },
        handleSelect (val) {
            this.$router.push({
                path: val
            })
        },
    },
    created () {
        this.init()
    },
    mounted () {
        let theme = JSON.parse(localStorage.getItem('theme')) || {}
        document.body.className = theme.value ? `custom-${theme.value}`: ''
    }
}
</script>
<style lang="scss">
.admin-index {
    position: relative;
    .action-bar {
        padding: 0 20px;
        line-height: 60px;
        position: absolute;
        right: 0;
        top: 0;
        i {
            color: #909399;
            cursor: pointer;
        }
    }
}
</style>
