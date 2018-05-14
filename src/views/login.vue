<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="loginForm" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="loginForm.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click.native.prevent="handleSubmit" type="primary" :loading="loading" long>
                                <span v-if="!loading">登录</span>
                                <span v-else>登录中...</span>
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import { login, mobileLogin, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (!value || value.length < 6) {
                callback(new Error('密码不能小于6位'))
            } else {
                callback()
            }
        }
        return {
            loading: false,
            loginForm: {
                username: 'admin',
                password: '123456',
                code: '',
                randomStr: Math.ceil(Math.random() * 100000) + '_' + Date.now(),
                mobile: null,
                smsCode: ''
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    const username = this.loginForm.username.trim()
                    login(username,this.loginForm.password,this.loginForm.randomStr,this.loginForm.code).then(response => {
                        this.loading = false;
                        const data = response.data;
                        setToken(data.access_token)
                        this.$store.commit('SET_TOKEN',data.access_token)
                        this.$store.commit('SET_REFRESH_TOKEN',data.refresh_token)
                        this.$store.dispatch('GetInfo')
                    }).catch(error =>{
                        this.loading = false;
                        console.error(error);
                    })
                }else {
                    this.$Message.error({
                        content: '完了，没登录上~~',
                        duration: 5
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
