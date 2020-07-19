<template>
    <div class="top-menu-layout">
        <el-row class="header">
            <el-col :span="2" class="wrap-logo">
                <div class="logo">
                    MY-ADMIN
                </div>
            </el-col>
            <el-col :span="18">
                <myMenu mode="horizontal" />
            </el-col>
            <el-col :span="4" class="wrap-toolbar">
                <toolBar />
            </el-col>
        </el-row>
        <div class="container">
            <transition name="routerAnimate" mode="out-in">
                <router-view />
            </transition>
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
@import '../../../style/common.scss';
.top-menu-layout {
    .header {
        .wrap-logo,
        .wrap-toolbar {
            height: 61px;
            border-bottom: 1px solid #e6e6e6;
        }
        .wrap-logo {
            @include flex;
            .logo {
                font-size: 16px;
                color: #303133;
                font-family: Arial, Helvetica, sans-serif;
            }
        }
    }
    .routerAnimate-enter-active {
        animation: fadeInDown .5s;
    }
    .routerAnimate-leave-active {
        animation: fadeOutDown .5s;
    }
}
</style>
