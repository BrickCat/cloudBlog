import Cookies from 'js-cookie'

const TokenKey = 'Blog-Token'

const UserInfoKey = 'Blog-UserInfo'

const UserRoleKey =  'Blog-Role'

const GuestKey = 'Blog-Guest'

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
    return localStorage.getItem(UserInfoKey)
}

export function setUser (user) {
    return localStorage.setItem(UserInfoKey,user)
}

export function removeUser () {
    return localStorage.removeItem(UserInfoKey)
}

export function setAdmin (role) {
    return localStorage.setItem(UserRoleKey,role);
}

export function getAdmin () {
    return localStorage.getItem(UserRoleKey);
}
export function removeAdmin () {
    return localStorage.removeItem(UserRoleKey)
}

export function setGuest (username) {
    return localStorage.setItem(GuestKey,username)

}

export function getGuest () {
    return localStorage.getItem(GuestKey)
}
