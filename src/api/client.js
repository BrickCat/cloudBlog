import request from '@/utils/request'

export function client_list () {
    return request({
        url: '/blog/client/get',
        method: 'GET'
    })
}
