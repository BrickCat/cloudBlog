<template>
    <div id="particles" style="width: 100%;height: 100%;">
        <div style="position:absolute; top:50%; transform:translate(0,-50%);justify-content: center;text-align: center;">
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" style="height: 120px;width: 120px;border-radius: 60px;margin-bottom: 1em;margin-left: auto;margin-right: auto;" />
            <div class="description">
                Nothing is impossible.
            </div>
            <div class="links">
                <a href="javascript:void(0)" @click="ArticleListTo">Blog</a>
                <a href="/share">Share</a>
                <a target="_blank" href="http://weibo.com/1839900520">Weibo</a>
                <a target="_blank" href="https://github.com/BrickCat">GitHub</a>
                <a href="/about">Me</a>
                <a href="#" @click="LoginTo">Login</a>
            </div>
        </div>
    </div>
</template>

<script>
    import particles from 'particles.js';
    import Cookies from 'js-cookie'

    export default {
        name: 'particles',
        data () {
            return {

            }
        },
        methods:{
            ArticleListTo () {
                this.$router.push({
                    name: 'blog_index'
                })
            },
            LoginTo () {
                this.$router.push({
                    name: 'login'
                })
            }
        },
        mounted () {
            particlesJS.load('particles','/src/images/particles.data');
        },
        destroyed () {

        }
    };
</script>

<style scoped>
    #particles{
        position: absolute;
        width: 99%;
        height: 98%;
        background-color: #F0FFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Raleway';
    }
    .description{
        font-size: 2em;
        font-weight: bold;
        color:#6388AA;
    }
    .links{
        font-size: 1.5em;
        margin-top: 1em;
        font-weight: bold;
    }
    .links a{
        margin: 0 1.5em;
    }
    .links a:link{
        color:#9BACBD;
    }
    .links a:hover{
        color:#6388AA;
    }
    .links a:visited{
        color: #9BACBD
    }
    .links a:active{

    }
</style>
