<template>
    <div class="wrap-grow">
        <div class="wrap-node">
            <div class="node-info" v-for="item in testData" :key="item.id" @click="handleClick(item)" :class="{'active': currentNode.id === item.id, 'disabled': item.disabled}">
                <div class="tit">
                    <p>
                        <span>{{item.tit}}</span>
                    </p>
                </div>
                <p class="name">{{item.subtit}}</p>
            </div>
        </div>
        <div class="node-detail">
            <el-card v-if="currentNode.id">
                <p class="tit">当前节点: {{currentNode.tit}}</p>
                <p v-for="(item, index) in currentNode.info" :key="index" class="detail">
                    <span>{{index + 1}}. {{item.con}}</span>
                    <span>{{item.time}}</span>
                </p>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            testData: [{
                id: '1',
                tit: 'a',
                subtit: 'hello a',
                info: [{
                    con: 'aaaaaa',
                    time: '2020-07-17'
                }, {
                    con: 'aaaaaa',
                    time: '2020-07-17'
                }]
            }, {
                id: '2',
                tit: 'b',
                subtit: 'hello b',
                info: [{
                    con: 'bbbbbb',
                    time: '2020-07-17'
                }, {
                    con: 'bbbbbb',
                    time: '2020-07-17'
                }]
            }, {
                id: '3',
                tit: 'c',
                subtit: 'hello c',
                info: [{
                    con: 'ccccc',
                    time: '2020-07-17'
                }, {
                    con: 'ccccc',
                    time: '2020-07-17'
                }]
            }, {
                id: '4',
                tit: 'd',
                subtit: 'hello d',
                info: [{
                    con: 'ddddddd',
                    time: '2020-07-17'
                }, {
                    con: 'ddddddd',
                    time: '2020-07-17'
                }]
            }, {
                id: '5',
                tit: 'e',
                subtit: 'hello e',
                info: [{
                    con: 'eeeeeee',
                    time: '2020-07-17'
                }, {
                    con: 'eeeeeee',
                    time: '2020-07-17'
                }]
            }],
            currentNode: {}
        }
    },
    methods: {
        handleClick (data) {
            if (data.disabled) return
            this.currentNode = data
        }
    }
}
</script>
<style lang="scss">
@mixin flex($direction: row, $justifyContent: center, $alignItems: center) {
    display: flex;
    flex-direction: $direction;
    justify-content: $justifyContent;
    align-items: $alignItems;
}
@mixin triangle {
    position: relative;
    &::before {
        box-sizing: content-box;
        width: 0px;
        height: 0px;
        position: absolute;
        top: -12px;
        left: 67px;
        padding: 0;
        border-bottom: 6px solid #FFFFFF;
        border-top: 6px solid transparent;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        display: block;
        content: '';
        z-index: 200;
    }
    &::after {
        box-sizing: content-box;
        width: 0px;
        height: 0px;
        position: absolute;
        top: -18px;
        left: 64px;
        padding: 0;
        border-bottom: 9px solid #b3d8ff;
        border-top: 9px solid transparent;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        display: block;
        content: '';
        z-index: 150;
    }
} 
.wrap-grow {
    .wrap-node {
        overflow: hidden;
        padding: 60px 20px 20px 20px;
        @include flex(row, center, center);
        .node-info {
            float: left;
            position: relative;
            cursor: pointer;
            &:hover,
            &.active {
                &::after {
                    background: #79bbff;
                }
                .tit {
                    color: #303133;
                    &::before {
                        background: #409EFF;
                    }
                    &::after {
                        background: #79bbff;
                    }
                    p {
                        border-color: #79bbff;
                        span {
                            background-color: #79bbff;
                        }
                        &::after {
                            border-bottom-color: #79bbff;
                        }
                    }
                }
                .name {
                    color: #303133;
                }
            }
            &.disabled {
                cursor: no-drop;
                &::after {
                    background: #DCE3EB;
                }
                .tit {
                    &::before {
                        background: #DCE3EB;
                    }
                    &::after {
                        background: #DCE3EB;
                    }
                }
            }
            &::after {
                content: '';
                width: 100%;
                height: 2px;
                position: absolute;
                top: 0;
                left: 0;
                background: #c6e2ff;
                transform: translateY(-50%);
                transition: all .2s cubic-bezier(.645, .045, .355, 1);
            }
            .tit {
                padding: 20px 25px 0 25px;
                width: 200px;
                text-align: center;
                line-height: 40px;
                position: relative;
                color: #606266;
                box-sizing: border-box;
                &::after {
                    content: '';
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: #b3d8ff;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    transition: all .2s cubic-bezier(.645, .045, .355, 1);
                }
                &::before {
                    content: '';
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: #79bbff;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, -50%);
                    z-index: 20;
                    transition: all .2s cubic-bezier(.645, .045, .355, 1);
                }
                p {
                    border: 2px solid #b3d8ff;
                    border-radius: 4px;
                    height: 60px;
                    padding: 6px;
                    box-sizing: border-box;
                    line-height: 44px;
                    transition: all .2s cubic-bezier(.645, .045, .355, 1);
                    @include triangle;
                    &::after {
                        transition: all .2s cubic-bezier(.645, .045, .355, 1);
                    }
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        background: #b3d8ff;
                        color: #ffffff;
                        border-radius: 4px;
                        transition: all .2s cubic-bezier(.645, .045, .355, 1);
                    }
                }
            }
            .name {
                width: 100%;
                text-align: center;
                line-height: 40px;
                position: absolute;
                left: 0;
                top: 0;
                color: #606266;
                transform: translateY(-100%);
            }
        }
    }
    .node-detail {
        @include flex(row, center, center);
        .el-card {
            width: 80%;
        }
        p {
            line-height: 40px;
        }
        .tit {
            font-size: 18px;
            color: #303133;
        }
        .detail {
            color: #606266;
            @include flex(row, space-between, center);
        }
    }
}
</style>
