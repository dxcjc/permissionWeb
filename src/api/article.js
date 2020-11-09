import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/info/list',
    method: 'get'
  })
}

export function getInfoByUid(id) {
  return request({
    url: '/info/getInfoByUid',
    method: 'get',
    params: { id }
  })
}
// export function getAllRoles() {
//   return request({
//     url: '/role/getAllRoles',
//     method: 'get'
//   })
// }

export function edit(data) {
  return request({
    url: '/info/edit',
    method: 'post',
    data
  })
}

export function deleteByUid(data) {
  return request({
    url: '/info/deleteByUid',
    method: 'post',
    data
  })
}

export function deleteUser(uid) {
  return request({
    url: '/info/deleteUser',
    method: 'get',
    params: { uid }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
