<template>
    <div class="top-menu-layout">
        <div class="header">
            <myMenu mode="horizontal" />
            <div class="header-right">
                <toolBar />
            </div>
        </div>
        <div class="container">
            <router-view />
        </div>
    </div>
</template>
<script>
import myMenu from '@/components/menu/index'
import toolBar from '@/components/toolBar/index'
export default {
    components: {
        myMenu,
        toolBar
    }
}
</script>
<style lang="scss">
.top-menu-layout {
    .header {
        position: relative;
        .header-right {
            padding: 0 20px;
            height: 60px;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>
