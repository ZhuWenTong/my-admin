<template>
    <div class="admin-index">
        <component :is="currentLayout" />
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            currentLayout: 'topMenu'
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
        ...mapMutations('layout', ['changeLayout'])
    },
    mounted () {
        let theme = JSON.parse(localStorage.getItem('theme')) || {}
        let layout = JSON.parse(localStorage.getItem('layout')) || {}
        document.body.className = theme.value ? `custom-${theme.value}`: 'custom-default'
        this.currentLayout = layout.value || 'topMenu'
    },
    watch: {
        layoutData (data) {
            if (data.value) {
                this.currentLayout = data.value
            }
        }
    }
}
</script>
