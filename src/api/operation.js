import request from '@/utils/request'

export function getBtnInfo(desc) {
  return request({
    url: '/operation/getBtnInfo',
    method: 'get',
    params: { desc }
  })
}
export function getOperation() {
  return request({
    url: '/operation/getOperation',
    method: 'get',
  })
}

