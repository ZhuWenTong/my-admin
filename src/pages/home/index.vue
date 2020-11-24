<template>
    <div>
        <el-button @click="test">test</el-button>
    </div>
</template>
<script>
import {requestTest} from '@/api/test'
export default {
    data () {
        return {

        }
    },
    methods: {
        test () {
            console.log('do')
            requestTest({a: 1}).then(res => {
                console.log(res)
            })
        }
    }
}
</script>

