// const jwt = require('jsonwebtoken')
// let time
const TokenKey = 'Admin-Token'

export function getToken(token) {
  // const accessToken = jwt.verify(token, 'I_LOVE_JING').access_token
  // new Date() - time > accessToken ? removeToken() : ''
  return window.sessionStorage.getItem(TokenKey, token)
}

export function setToken(token) {
  // time = new Date()
  console.log('step--------------->3')
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}
