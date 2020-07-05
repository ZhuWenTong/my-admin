<template>
    <el-menu :default-active="$route.path" :mode="mode" @select="handleSelect" :collapse="collapse">
        <el-menu-item :index="item.path" v-for="item in menuData" :key="item.path">
            <i :class="item.icon" style="margin-right: 10px;"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        mode: {
            type: String,
            default: 'vertical'
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            menuData: []
        }
    },
    computed: {
        ...mapState('menus', ['menuList'])
    },
    methods: {
        ...mapActions('menus', ['getMenuList']),
        async init () {
            let menuData = JSON.parse(localStorage.getItem('menuList'))
            if (!menuData) {
                menuData = await this.getMenuList()
                localStorage.setItem('menuList', JSON.stringify(menuData))
                this.menuData = menuData
            } else {
                this.menuData = menuData
            }
        },
        handleSelect (val) {
            if (val === this.$route.path) return
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
