import request from '@/utils/request'

export function client_list () {
    return request({
        url: '/blog/client/get',
        method: 'GET'
    })
}

export function client_put (client) {
    return request({
        url: '/blog/client/put',
        method: 'PUT',
        data: client
    })
}
