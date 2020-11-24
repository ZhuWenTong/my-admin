import {postRequest} from '@/utils/request'

export async function requestTest(params) {
    return postRequest('/api/test1', params)
}

export default {requestTest}
