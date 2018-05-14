import { login, mobileLogin, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUser, removeUser } from '@/utils/auth'
import {router} from '../../router';

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        permissions: [],
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token) =>{
          state.token = token
        },
        SET_REFRESH_TOKEN: (state,rfToken) =>{
          state.refresh_token = rfToken
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state,avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state,roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },
    actions: {

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.sysUser.username)
                    commit('SET_AVATAR', data.sysUser.avatar)
                    commit('SET_INTRODUCTION', data.sysUser.introduction)
                    const permissions = {}
                    for (let i = 0; i < data.permissions.length; i++) {
                        permissions[data.permissions[i]] = true
                    }
                    commit('SET_PERMISSIONS', permissions)
                    setUser(JSON.stringify(data.sysUser));
                    alert(data.sysUser)
                    router.push({
                        name: 'blog_index'
                    })
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token, state.refresh_token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_REFRESH_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    removeUser()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data.data
                    commit('SET_ROLES', data.role)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        }
    }
};

export default user;
