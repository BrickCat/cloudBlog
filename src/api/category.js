import request from '@/utils/request';

export function category_list (param) {
    return request({
        url: '/blog/category/list',
        method: 'GET',
        params: param
    })
}

export function category_put (category) {
    return request({
        url: '/blog/category/put',
        method: 'PUT',
        data: category
    })
}

export function category_remove (id) {
    return request({
        url: '/blog/category/remove/'+id,
        method: 'DELETE'
    })
}
