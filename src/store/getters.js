const getters = {
    token:state => state.user.token,
    avatar:state => state.user.avatar,
    name:state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    setting: state => state.user.setting,
    guest: state => state.user.guest
}
export default getters
