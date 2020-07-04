<template>
    <div class="left-menu-layout">
        <div class="header">
            <div class="header-right">
                <toolBar />
            </div>
        </div>
        <el-row>
            <el-col :span="3" class="left-menu">
                <myMenu />
            </el-col>
            <el-col :span="21">
                <router-view />
            </el-col>
        </el-row>
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
.left-menu-layout {
    .header {
        height: 60px;
        position: relative;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        .header-right {
            padding: 0 20px;
            height: 60px;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .left-menu {
        height: calc(100vh - 60px);
        .el-menu {
            height: 100%;
        }
    }
}
</style>
