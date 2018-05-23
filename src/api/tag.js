import request from '@/utils/request'

export function tag_put(tag){
    return request({
        url: '/blog/tag/put',
        method: 'PUT',
        data: tag
    })
}
