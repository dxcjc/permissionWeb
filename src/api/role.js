import request from '@/utils/request'

export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
   data
  })
}
export function deleteRoleOnUser(rid) {
  return request({
    url: '/role/deleteRoleOnUser',
    method: 'get',
    params:{rid}
  })
}

export function deleteRoleOnPermission(rid) {
  return request({
    url: '/role/deleteRoleOnPermission',
    method: 'get',
    params:{rid}
  })
}

export function deleteRoleByRid(rid) {
  return request({
    url: '/role/deleteRoleByRid',
    method: 'get',
    params:{rid}
  })
}





