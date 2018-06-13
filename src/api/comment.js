import request from '@/utils/request'

export function put_comment (comment) {
    return request({
        url:'/blog/comment/put',
        method: 'PUT',
        data:comment
    })
}

export function list_comment (articleId) {
    return request({
        url: '/blog/comment/'+articleId,
        method: 'GET'
    })
}
