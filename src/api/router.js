import request from '@/utils/request'

export function edit(rname) {
  return request({
    url: '/routes/edit',
    method: 'get',
    params: {rname}
  })
}

export function getRoutes(data) {
  return request({
    url: '/routes/getRoutes',
    method: 'post',
    data
  })
}

export function getAllRoles() {
  return request({
    url: '/role/getAllRoles',
    method: 'get',
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
