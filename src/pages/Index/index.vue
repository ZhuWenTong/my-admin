<template>
    <div class="admin-index">
        <transition name="pageAnimate" mode="out-in">
            <component :is="layoutData.value" />
        </transition>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            defaultLayout: {
                name: '上下布局',
                value: 'topMenu'
            },
            defaultTheme: {
                name: 'ElementUI',
                value: 'default',
                color: '#409EFF'
            }
        }
    },
    computed: {
        ...mapState('layout', ['layoutData'])
    },
    components: {
        topMenu: () => import('@/components/layout/topMenu/index'),
        leftMenu: () => import('@/components/layout/leftMenu/index')
    },
    methods: {
        ...mapMutations('layout', ['changeLayout']),
        ...mapMutations('theme', ['setSystemTheme'])
    },
    mounted () {
        let theme = JSON.parse(localStorage.getItem('theme')) || this.defaultTheme
        let layout = JSON.parse(localStorage.getItem('layout')) || this.defaultLayout
        this.setSystemTheme(theme)
        this.changeLayout(layout)
    }
}
</script>
<style lang="scss">
.pageAnimate-enter-active {
    animation: fadeInDown .4s;
}
.pageAnimate-leave-active {
    animation: fadeOutDown .3s;
}
</style>
