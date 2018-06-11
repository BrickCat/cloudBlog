<style lang="less">
    @import '../../../styles/common.less';
    @import './less/article-publish.less';
    @import './less/add-article.less';
</style>
<template>
    <Row class="post" type="flex" justify="center">
        <Col class="width">
            <h1 class="title">
                {{article.title}}
            </h1>
            <div class="author">
                <a class="avatar" href="/u/1441f4ae075d">
                    <img :src="anthor.avatar" alt="96">
                </a>
                <div class="info">
                    <span class="name"><a href="/u/1441f4ae075d" style="color: #333;">彭小六</a></span>
                    <img class="badge-icon" data-toggle="tooltip" title="" src="//upload.jianshu.io/user_badge/650526a4-4446-48c0-a1ab-bbfe12fe510c" alt="650526a4 4446 48c0 a1ab bbfe12fe510c" data-original-title="简书大学堂讲师">
                    <!-- 关注用户按钮 -->
                    <Button type="success" shape="circle" size="small" icon="plus-round">关注</Button>
                    <!-- 文章数据信息 -->
                    <div class="meta">
                        <!-- 如果文章更新时间大于发布时间，那么使用 tooltip 显示更新时间 -->
                        <span class="publish-time" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="最后编辑于 2018.05.08 09:04">2018.05.08 08:45*</span>
                        <span class="wordage">字数 1553</span>
                        <span class="views-count">阅读 99079</span><span class="comments-count">评论 419</span><span class="likes-count">喜欢 2001</span><span class="rewards-count ">赞赏 8</span></div>
                </div>
            </div>
        </Col>
        <Col>
            <mavon-editor style="height: 100%;" class="content" v-model="article.article_md" :ishljs = "isTrue"
                          :toolbarsFlag="isFalse" :code_style="codeStyle" :default_open="preview" :editable="isFalse"
                          :subfield="isFalse" :scrollStyle="isFalse" :navigation="isTrue"
            />
        </Col>
        <Col class="width">
            <div class="comment-list">
                <div>
                    <div class="new-comment">
                        <div style="display: block;">
                            <a class="avatar"><img src="//upload.jianshu.io/users/upload_avatars/4394289/ac6a385a-38fc-4bcf-a187-6fb59eeca8b8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114"></a>
                            <textarea v-model="commentText" placeholder="写下你的评论..." @focus="onFocus" @keyup.ctrl.13="comment"></textarea>
                            <div class="write-function-block" v-if="showButton">
                                <div class="emoji-modal-wrap">
                                    <a class="emoji" @click="showEmoji = true">
                                        <Icon style="font-size: 30px;color: #969696;" type="android-happy"></Icon>
                                    </a>
                                </div>
                                <div class="hint">Ctrl+Enter 发表</div>
                                <a class="btn btn-send" @click="comment">发送</a>
                                <a class="cancel" @click="onCancel">取消</a>
                                <transition name="slide-fade">
                                    <div class="emoji-box" v-if="showEmoji" >
                                        <Button
                                                class="pop-close"
                                                type="error"
                                                size="small"
                                                icon="close-round"
                                                @click="showEmoji = false"></Button>
                                        <vue-emoji
                                                @selectEmoji="selectEmoji">
                                        </vue-emoji>
                                        <span class="pop-arrow arrow"></span>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comments-placeholder" v-if="isFalse">
                    <div class="author">
                        <div class="avatar"></div>
                        <div class="info">
                            <div class="name"></div>
                            <div class="meta"></div>
                        </div>
                    </div>
                    <div class="text"></div>
                    <div class="text animation-delay"></div>
                    <div class="tool-group">
                        <Icon type="heart" class="Icon"></Icon>
                        <div class="zan"></div>
                        <Icon type="android-chat" class="Icon"></Icon>
                        <div class="zan"></div>
                    </div>
                </div>
                <div class="normal-comment-list">
                    <div>
                        <div>
                            <div class="top-title" :style="{marginTop:marginTop}">
                                <span>4条评论</span>
                                <a class="author-only">只看作者</a>
                                <a class="close-btn" style="display: none;">关闭评论</a>
                                <div class="pull-right">
                                    <a class="active">按时间倒序</a>
                                    <a class="">按时间正序</a>
                                </div>
                            </div>
                        </div>
                        <div class="comment">
                            <div>
                                <div class="comment-author">
                                    <a href="/u/f9e4a7b1208a" target="_blank" class="avatar">
                                        <img src="//upload.jianshu.io/users/upload_avatars/8585031/7c54b165-033e-421c-a247-97a307ebaf91.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114">
                                    </a>
                                    <div class="info">
                                        <a href="/u/f9e4a7b1208a" target="_blank" class="name">Triste花刺</a>
                                        <div class="meta"><span>2楼 · 2018.05.09 09:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="comment-wrap">
                                    <div class="comment-right">
                                        <p><img src="//static.jianshu.io/assets/emojis/smile.png" alt=":smile:" title=":smile:" class="emoji" width="20" height="20"></p>
                                        <div class="tool-group">
                                            <a class="action-button">
                                                <Icon type="heart" style="margin-right: 4px;font-size: 18px"></Icon>
                                                <span style="font-size: 14px;">赞</span>
                                            </a>
                                            <a class="">
                                                <Icon type="android-chat" style="margin-right: 4px;font-size: 18px"></Icon>
                                                <span style="font-size: 14px;">回复</span></a>
                                            <a class="report">
                                                <span style="font-size: 14px;">举报</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-comment-list">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</template>

<script>
    import {_f_article_get} from '@/api/article';
    import vueEmoji from '@/views/components/emoji/emoji.vue';
    import data from '@/views/components/emoji/data/emoji-data.js';
    let emojiData = {}
    Object.values(data).forEach(item => {
        emojiData = { ...emojiData, ...item }
    })
    export default {
        name: 'article-detail',
        components:{vueEmoji},
        data (){
            return {
                articleId: localStorage.getItem("articleId"),
                article:{},
                isFalse:false,
                isTrue:true,
                codeStyle:'solarized-dark',
                preview:'preview',
                anthor:{},
                showEmoji: false,
                commentText:'',
                src:null,
                marginTop:'30px',
                showButton:false,
            }
        },
        created (){
            this.init();
        },
        mounted (){

        },
        computed :{

        },
        methods :{
            init(){
                if(this.$route.params.articleId){
                    localStorage.setItem("articleId",this.$route.params.articleId);
                }
                this.getArticle();
            },
            selectEmoji(v){
                this.commentText += v;

            },
            onFocus() {
                this.showButton = true;
                this.marginTop='60px';
            },
            onCancel (){
              this.showButton = false;
              this.showEmoji = false;
                this.marginTop='30px';
            },
            getArticle(){
                _f_article_get(this.articleId).then(res =>{
                    console.log(res)
                    if(res.status === 200){
                        this.article = res.data.data;
                        this.anthor = res.data.data.anthor;
                        document.title = this.article.title;
                    }
                }).catch(e =>{
                    console.log(e);
                })
            },
            comment() {
                alert(1)
            },
            emoji (value) {
                if (!value) return
                Object.keys(emojiData).forEach(item => {
                    value = value.replace(new RegExp(item, 'g'), emojiData[item])
                    console.log(value)
                })
                this.src = require('../../../images/emoji/'+value);
                let html = `<img src="${this.src}" width="16px" height="16px">`
                return html;
            },
        },
        watch :{

        }
    };
</script>
<style scoped lang="less">
    .post{
        margin: 0 auto;
        padding-top: 20px;
        padding-bottom: 40px;
    }
    .width{
        width: 620px;

    }
    .author {
        margin: 30px 0 40px;
        img{
            vertical-align: middle;
        }
        .avatar{
            width: 48px;
            height: 48px;
            vertical-align: middle;
            display: inline-block;
            img{
                width: 100%;
                height: 100%;
                border: 1px solid #ddd;
                border-radius: 50%;
            }
        }
        .info{
            vertical-align: middle;
            display: inline-block;
            margin-left: 8px;
            img.badge-icon{
                margin-right: 5px;
                width: 20px;
                height: 20px;
                border-radius: 0;
                border: 0;
            }
        }
        .name{
            margin-right: 3px;
            font-size: 16px;
            vertical-align: middle;
            color: #333;
        }
        .meta{
            margin-top: 5px;
            font-size: 12px;
            color: #969696;
            span{
                padding-right: 5px;
            }
        }
    }
    .title{
        word-break: break-word!important;
        word-break: break-all;
        margin: 20px 0 0;
        font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        font-size: 34px;
        font-weight: 700;
        line-height: 1.3;
    }
    .comment-list{
        padding-top: 20px;
        .new-comment{
            position: relative;
            textarea{
                padding: 10px 15px;
                width: 572px;
                height: 80px;
                font-size: 13px;
                border: 1px solid #dcdcdc;
                border-radius: 4px;
                background-color: hsla(0,0%,71%,.1);
                resize: none;
                display: inline-block;
                vertical-align: top;
                outline-style: none;
            }
            .write-function-block{
                height: 50px;
                width: 572px;
                float: right;
                .hint{
                    float: left;
                    margin: 20px 0 0 20px;
                    font-size: 13px;
                    color: #969696;
                }
            }
            .emoji-modal-wrap{
                position: relative;
            }
            a{
                text-decoration: none;
                color: #333;
                cursor: pointer;
            }
            .emoji{
                float: left;
                margin-top: 14px;
            }
            .btn-send {
                float: right;
                text-align: center;
                width: 78px;
                margin: 10px 0;
                padding: 8px 18px;
                font-size: 16px;
                border: none;
                border-radius: 20px;
                color: #fff!important;
                background-color: #42c02e;
                cursor: pointer;
                outline: none;
                display: block;
            }
            .cancel {
                float: right;
                margin: 18px 30px 0 0;
                font-size: 16px;
                color: #969696;
            }
        }
        .avatar {
            margin-right: 5px;
            width: 38px;
            height: 38px;
            vertical-align: middle;
            display: inline-block;
            img{
                width: 100%;
                height: 100%;
                border: 1px solid #ddd;
                border-radius: 50%;
            }
        }
        .normal-comment-list {
            .top-title {
                padding-bottom: 20px;
                font-size: 17px;
                font-weight: 700;
                border-bottom: 1px solid #f0f0f0;
                span {
                    vertical-align: middle;
                }
                .author-only {
                    margin-left: 10px;
                    padding: 4px 8px;
                    font-size: 12px;
                    color: #969696;
                    border: 1px solid #e1e1e1;
                    border-radius: 12px;
                }
                .close-btn {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #969696;
                }
                .pull-right {
                    float: right!important;
                    .active,.pull-right a:hover {
                        color: #2f2f2f;
                    }
                    a {
                        margin-left: 10px;
                        font-size: 12px;
                        font-weight: 400;
                        color: #969696;
                        display: inline-block;
                    }
                    a:hover {
                        color: #2f2f2f;
                    }
                }
            }
        }
        .comment{
            //padding: 20px 0 30px;
            border-bottom: 1px solid #f0f0f0;
            p {
                font-size: 16px;
            }
        }
        .comment-author{
            margin: 30px 0 20px;
            img{
                vertical-align: middle;
            }
            .avatar {
                width: 48px;
                height: 48px;
                vertical-align: middle;
                display: inline-block;
                img {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ddd;
                    border-radius: 50%;
                }
            }
            .info{
                vertical-align: middle;
                display: inline-block;
                margin-left: 8px;
                img.badge-icon{
                    margin-right: 5px;
                    width: 20px;
                    height: 20px;
                    border-radius: 0;
                    border: 0;
                }
            }
            .name{
                margin-right: 3px;
                font-size: 16px;
                vertical-align: middle;
                color: #333;
            }
            .meta{
                margin-top: 5px;
                font-size: 12px;
                color: #969696;
                span{
                    padding-right: 5px;
                }
            }
        }
        .comment-wrap{
            .comment-right{
                width: 572px;
                margin-left: 60px;
            }
            .report {
                float: right;
                margin: 12px 0 0 10px;
                display: none;
            }
        }
        p {
            display: block;
            margin: 10px 0;
            line-height: 1.5;
            font-size: 16px;
            word-break: break-word!important;
            word-break: break-all;
        }
        .tool-group a {
            margin-right: 10px;
            margin-bottom: 10px;
            color: #969696;
            display: inline-block;
        }
        .sub-comment-list {
            margin-top: 20px;
            padding: 5px 0 5px 20px;
            border-left: 2px solid #d9d9d9;
        }
    }
    .emoji-box {
        position: absolute;
        z-index: 10;
        left: 10px;
        top: 130px;
        border-radius: 5px;
        box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
        background: white;
        .Button {
            position: absolute;
            border: none;
            color: #FF4949;
            right: 12px;
            top: 12px;
            z-index: 10;
        }
        .arrow {
            left: 10px;
        }
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .5s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }

    .comments-placeholder {
        padding: 20px 0 30px;
        .author{
            margin-bottom: 15px;
            .avatar{
                cursor: default!important;
                margin-right: 5px;
                width: 38px;
                height: 38px;
                background-color: #eaeaea;
                border-radius: 50%;
            }
            .info{
                vertical-align: middle;
                display: inline-block;
                .name{
                    margin-bottom: 6px;
                    height: 15px;
                    width: 60px;
                    background-color: #eaeaea;
                }
                .meta{
                    height: 12px;
                    width: 120px;
                    background-color: #eaeaea;
                }
            }
        }
        .text{
            width: 100%;
            height: 16px;
            margin: 0 0 8px!important;
            background-color: #eaeaea;
            animation: loading 1s ease-in-out infinite;
            -webkit-animation: loading 1s ease-in-out infinite;
            -moz-animation: loading 1s ease-in-out infinite;
            -o-animation: loading 1s ease-in-out infinite;
            -ms-animation: loading 1s ease-in-out infinite;
        }
        .animation-delay{
            animation: loading 1s ease-in-out -.5s infinite;
            -webkit-animation: loading 1s ease-in-out -.5s infinite;
            -moz-animation: loading 1s ease-in-out -.5s infinite;
            -o-animation: loading 1s ease-in-out -.5s infinite;
            -ms-animation: loading 1s ease-in-out -.5s infinite;
        }
        .tool-group {
            margin: 0;
            padding-top: 6px;
            color: #eaeaea;
            font-size: 15px;

            .Icon {
                margin-right: 5px;
                vertical-align: middle;
                display: inline-block;
            }

            .zan {
                height: 14px;
                width: 40px;
                background-color: #eaeaea;
                margin-right: 10px;
                display: inline-block;
            }
        }
    }

</style>
