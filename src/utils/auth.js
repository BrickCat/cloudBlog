import Cookies from 'js-cookie'

const TokenKey = 'Blog-Token'

const UserInfoKey = 'Blog-UserInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser () {
    return Cookies.get(UserInfoKey)
}

export function setUser (user) {
    return Cookies.set(UserInfoKey,user)
}

export function removeUser () {
    return Cookies.remove(UserInfoKey)
}
