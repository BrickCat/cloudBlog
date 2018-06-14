import request from '@/utils/request'

export function put_reply (reply) {
    return request({
        url:'/blog/reply/put',
        method:'PUT',
        data:reply
    })
}

export function _f_reply_list (commentId) {
    return request({
        url:'/blog/reply/f/'+commentId,
        method:'GET'
    })
}
