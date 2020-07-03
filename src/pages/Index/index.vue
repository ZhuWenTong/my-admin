<template>
    <div>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">{{item.name}}</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            activeIndex: '/home'
        }
    },
    computed: {
        ...mapState('menus', ['menuList'])
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
        }
    },
    created () {
        this.init()
    }
}
</script>

