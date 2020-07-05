<template>
    <div class="left-menu-layout">
        <el-row class="header">
            <el-col :span="leftCol" class="wrap-logo">
                <div class="logo" :style="{'font-size': isExpand ? '16px': '12px'}">
                    MY-ADMIN
                </div>
            </el-col>
            <el-col :span="rightCol" class="header-right">
                <el-row>
                    <el-col :span="20">
                        <div class="header-content">
                            <div class="toggle" @click="handleToggle">
                                <i :class="{'el-icon-s-fold': isExpand, 'el-icon-s-unfold': !isExpand}"></i>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <toolBar />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="leftCol" class="left-menu">
                <myMenu :collapse="!isExpand" />
            </el-col>
            <el-col :span="rightCol" class="wrap-container">
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
    },
    data () {
        return {
            leftCol: 3,
            rightCol: 21,
            isExpand: true
        }
    },
    methods: {
        handleToggle () {
            this.isExpand = !this.isExpand
            this.leftCol = this.isExpand ? 3 : 1
            this.rightCol = this.isExpand ? 21 : 23
        }
    }
}
</script>
<style lang="scss">
@import '../../../style/common.scss';
.left-menu-layout {
    .header {
        height: 60px;
        position: relative;
        border-bottom: 1px solid #e6e6e6;
        box-sizing: border-box;
        .wrap-logo {
            height: 100%;
            @include flex;
            .logo {
                font-size: 16px;
                color: #303133;
            }
        }
        .header-right {
            .header-content {
                height: 60px;
                @include flex(row, flex-start, center);
                .toggle {
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    &:hover {
                        border-color: #EBEEF5;
                    }
                    i {
                        font-size: 20px;
                        color: #909399;
                    }
                }
            }
        }
    }
    .left-menu {
        height: calc(100vh - 60px);
        .el-menu {
            height: 100%;
        }
    }
    .wrap-logo,
    .logo,
    .header-right,
    .left-menu,
    .wrap-container {
        transition: all .5s cubic-bezier(.645, .045, .355, 1);
    }
}
</style>
