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
            params: param
        }
    )
}

export function get (id) {
    return request(
        {
            url: '/blog/article/'+id,
            method: 'GET'
        }
    )
}

export function romove (id) {
    return request(
        {
            url: '/blog/article/remove/'+id,
            method: 'DELETE'
        }
    )
}
