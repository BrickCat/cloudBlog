<template>
    <div class="layout">
        <Layout>
            <Header style="background-color: #F15A24;">
                <Menu mode="horizontal" theme="dark" active-name="$route.name" @on-select="changeMenu" style="background-color: #F15A24;height: 60px;">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="blog_index">
                            <Icon type="android-home"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                        <AutoComplete
                                v-model="value4"
                                icon="ios-search"
                                placeholder="input here"
                                style="width:300px;margin-right: 4em;margin-left: 15px;"
                                class="searchInput">
                            <div class="demo-auto-complete-item" v-for="item in data4">
                                <div class="demo-auto-complete-group">
                                    <span>{{ item.title }}</span>
                                    <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
                                </div>
                                <Option v-for="option in item.children" :value="option.title" :key="option.title">
                                    <span class="demo-auto-complete-title">{{ option.title }}</span>
                                    <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
                                </Option>
                            </div>
                            <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
                        </AutoComplete>
                        <ButtonGroup v-show="isNotLogin">
                            <Button type="ghost" style="color: white;" @click="loginTo">登录</Button>
                            <Button type="ghost" style="color: white;">注册</Button>
                        </ButtonGroup>
                        <Dropdown v-show="isLogin" transfer trigger="hover" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)" style="color: white">
                                <Avatar :src="avatorPath" />
                                    {{user.username}}
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list" style="text-align: center;">
                                <DropdownItem name="admin">后台管理</DropdownItem>
                                <DropdownItem divided name="logout">登出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <div class="single-page-con">
                <div class="single-page">
                    <router-view></router-view>
                </div>
                <footer>
                    <div class='address'>
                        <div class='data'>
                            <img src='../../../images/logo.png' />
                            <p>4001 507 507（周一至周日：2:00 - 21:00）</p>
                            <p>济南市高新区工业南路万达写字楼J1栋2310室</p>
                        </div>
                    </div>
                    <div class='company'>
                        <p>Copyright © 2017 Mancool Inc. 保留所有权利。鲁公网安备 11010802022978号   |   公共事务邮箱  549595297@qq.com    商务合作邮箱  549595297@qq.com   |   Power by Maozk <span style="color: #ed3f14">❤</span> </p>
                    </div>
                </footer>
            </div>
        </Layout>
    </div>
</template>

<script>
    import { getUser } from '@/utils/auth'
    export default {
        name: 'index',
        data () {
            return {
                user:{
                    useranme:'',
                    avatar:'',
                    roles:null,
                    userId:'',
                    permissions:null
                },
                isLogin: false,
                isNotLogin: true,
                value4: '',
                data4: [
                    {
                        title: '话题',
                        children: [
                            {
                                title: 'iView',
                                count: 10000,

                            },
                            {
                                title: 'iView UI',
                                count: 10600,

                            }
                        ]
                    },
                    {
                        title: '问题',
                        children: [
                            {
                                title: 'iView UI 有多好',
                                count: 60100,

                            },
                            {
                                title: 'iView 是啥',
                                count: 30010,

                            }
                        ]
                    },
                    {
                        title: '文章',
                        children: [
                            {
                                title: 'iView 是一个设计语言',
                                count: 100000,

                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            init () {
                if(getUser()){
                    let userInfo = JSON.parse(getUser());
                    this.$set(this.user,'username',userInfo.username)
                    this.$set(this.user,'avatar',userInfo.avatar)
                    this.isLogin = true;
                    this.isNotLogin = false;
                }
            },
            changeMenu(active){
                this.$router.push({
                    name:active
                })
            },
            loginTo () {
                this.$router.push({
                    name: 'login'
                })
                if(getUser()){
                    this.isLogin = true;
                    this.isNotLogin = false;
                }
            },
            handleClickUserDropdown (name) {
                if(name == 'logout'){
                    this.isLogin = false;
                    this.isNotLogin = true;
                    // 退出登录
                    this.$store.dispatch('LogOut').then(() => {
                        //location.reload() // 为了重新实例化vue-router对象 避免bug
                        this.$router.push({
                            name:'particles'
                        })
                    })
                }else if(name == 'admin'){
                    this.$router.push({
                        name: 'home_index'
                    })
                }

            }
        },
        computed: {
            avatorPath () {
                return this.user.avatar;
            }
        },
        created(){

        },
        mounted () {
            this.init();
        },
        destroyed () {

        }
    };
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        min-width: 768px;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
        display: block;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 910px;
        margin: 0 auto;
        margin-right: 0px;
    }
    .layout-footer-center{
        text-align: center;
        height: 300px;
    }
    footer{
        margin-top: 10px;
        height: 250px;
        background: #191919;
        width: 100%;
        bottom:0px;
        left:0px;
        margin-top: -0.4em;
    }
    .single-page-con {
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color: #F0F0F0;
        z-index: 1;
        transition: left .3s;
        width: 100%;
    }
    .single-page{
        background-color: white;
        width: 75%;
        margin: 0 auto;
    }
    .address {
        height: 201px;
        font-size: 16px;
        color: #a3a3a3;
        text-align: center;
    }
    .company {
        border-top: 1px solid #2b2b2b;
        padding-top: 1em;
        font-size: 14px;
        color: #a3a3a3;
        text-align: center;
    }
    .address img{
        width: 75px;
        height: 72px;
    }
    .data{
        position: relative;
        top: 20%;
    }
    /*滚动条样式*/
    .single-page-con::-webkit-scrollbar {/*滚动条整体样式*/
        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .single-page-con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .single-page-con::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
</style>
