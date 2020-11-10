import request from '@/utils/request'

export function edit(data) {
  return request({
    url: '/routes/edit',
    method: 'post',
    data
  })
}

export function getRoutes(data) {
  return request({
    url: '/routes/getRoutes',
    method: 'post',
    data
  })
}

export function getRoles(data) {
  return request({
    url: '/role/getRoles',
    method: 'post',
    data
  })
}

export function getAllRoute() {
  return request({
    url: `/routes/getAllRoute`,
    method: 'get',
  })
}

export function deleteRoute(data) {
  return request({
    url: `/routes/deleteRoute`,
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: `/routes/updatePermission`,
    method: 'post',
    data
  })
}
