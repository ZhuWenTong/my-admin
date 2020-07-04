<template>
    <el-menu :default-active="$route.path" :mode="mode" @select="handleSelect">
        <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">{{item.name}}</el-menu-item>
    </el-menu>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        mode: {
            type: String,
            default: 'vertical'
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
        },
    },
    created () {
        this.init()
    }
}
</script>