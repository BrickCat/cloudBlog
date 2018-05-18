import request from '@/utils/request'

export function put (article) {
    return request(
        {
            url: '/blog/article/put',
            method: 'PUT',
            data:article
        }
    )
}

export function list (param) {
    return request(
        {
            url: '/blog/article/list',
            method: 'GET',
            data: param
        }
    )
}
