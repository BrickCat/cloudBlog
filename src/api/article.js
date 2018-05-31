import request from '@/utils/request'

/**
 * 后台 Api
 * @param article
 */

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

/**
 * 前台 Api
 */
export function _f_article_list (param) {
    return request(
        {
            url: '/blog/article/f/list',
            method: 'GET',
            params: param
        }
    )
}
