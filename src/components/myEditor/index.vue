<template>
    <div id="editor" ref="editor" style="text-align:left;"></div>
</template>
<script>
import E from 'wangeditor'
import '@/plugins/jquery'
import {config} from '@/config/config'
import {getStore} from '@/plugins/storage'
export default {
    props: {
        value: String,
        menus: {
            type: Array,
            default () {
                return [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    'video',  // 插入视频
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复
                ]
            }
        },
        showLinkImg: {
            type: Boolean,
            default: false
        },
        showLinkVideo: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 20000
        },
        uploadUrl: {
            type: String,
            default: '/api/busiService/asPersonnel/txUpload'
        },
        isConform: { // 区分两种返回结果 true返回详细的数据对象 false直接返回图片/视频地址
            type: Boolean,
            default: true
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            editor: null
        }
    },
    methods: {
        init () {
            this.editor = new E(this.$refs.editor)
            this.editor.config.menus = this.menus
            this.editor.config.showLinkImg = this.showLinkImg
            this.editor.config.showLinkVideo = this.showLinkVideo
            this.editor.config.zIndex = this.zIndex
            this.handleUploadImg()
            this.handleUploadVideo()
            this.editor.config.onchange = html => {
                this.$emit('change', html)
            }
            this.$nextTick(() => {
                this.editor.create()
                this.editor.txt.html(this.value)    
            })
        },
        handleUploadImg () {
            const _this = this
            this.editor.config.customUploadImg = function (files, insert) {
                let formData = new FormData()
                formData.append('file', files[0])
                let url = config.apiUrl + _this.uploadUrl
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: formData,
                    headers: {
                        accessToken: getStore('accessToken')
                    },
                    contentType: false,
                    processData: false,
                    timeout: 10000,
                    error: function () {
                        _this.$Message.error('插入图片失败！')
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            if (_this.isConform) {
                                let fileData = res.fileData
                                let url = config.apiUrl + '/' + fileData.filePath + fileData.fileName
                                insert(url)
                            } else {
                                insert(config.apiUrl + '/' + res.filePath)
                            }
                        } else {
                            _this.$Message.error(res.msg)
                        }
                    }
                })
            }
        },
        handleUploadVideo () {
            const _this = this
            this.editor.config.customUploadVideo = function (files, insert) {
                let formData = new FormData()
                formData.append('file', files[0])
                let url = config.apiUrl + _this.uploadUrl
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: formData,
                    headers: {
                        accessToken: getStore('accessToken')
                    },
                    contentType: false,
                    processData: false,
                    async: false,
                    timeout: 10000,
                    error: function () {
                        _this.$Message.error('插入视频失败！')
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            if (_this.isConform) {
                                let fileData = res.fileData
                                let url = config.apiUrl + '/' + fileData.filePath + fileData.fileName
                                insert(url)
                            } else {
                                insert(config.apiUrl + '/' + res.filePath)
                            }
                        } else {
                            _this.$Message.error(res.msg)
                        }
                    }
                })
            }
        },
        clear () {
            this.editor.txt.html('')
        }
    },
    mounted () {
        this.init()
    }
}
</script>
