import request from '@/utils/request'

export function tag_put(tag){
    return request({
        url: '/blog/tag/put',
        method: 'PUT',
        data: tag
    })
}

export function tag_list (param) {
    return request({
        url: '/blog/tag/list',
        method: 'GET',
        params: param
    })
}

export function tag_remove (tagId) {
    return request(
        {
            url: '/blog/tag/remove/'+tagId,
            method: 'DELETE'
        }
    )
}

export function tag_list_component (userId) {
    return request({
        url: '/blog/tag/list/component',
        method: 'GET',
        params: {'userId':userId}
    })
}
