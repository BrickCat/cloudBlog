<template>
    <div class="sub-comment-list">
        <div class="sub-comment" v-for="item in replies">
            <p>
                <div class="v-tooltip-container" style="z-index: 0;">
                    <div class="v-tooltip-content">
                        <a href="/u/d15143ba3330" target="_blank">{{item.replyName}}</a>：
                    </div>
                </div>
                <span>{{item.content}}</span>
            </p>
            <div class="sub-tool-group">
                <span>{{item.createDate | formatDate}}</span>
                <a v-on:click="addReply('reply2',item)" style="margin-left: 10px;">
                    <Icon type="ios-chatbubble-outline" style="margin-right: 2px;font-size: 20px; vertical-align:middle;"></Icon>
                    <span style="vertical-align:middle;">回复</span>
                </a>
                <a class="report">
                    <span>举报</span>
                </a>
            </div>
        </div>
        <div class="sub-comment more-comment">
            <a class="add-comment-btn">
                <Icon type="android-create" style="margin-left: 4px;margin-right: 4px;font-size: 18px"></Icon>
                <span v-on:click="addReply('reply','')">添加新评论</span>
            </a>
            <span v-if="replies.length > 3" class="line-warp">
                还有3条评论，
                <a>展开查看</a>
            </span>
        </div>
        <transition name="slide-fade">
            <vue-comment @onFocus="onFocus" @onCancel="onCancel" :article="article" v-show="showComment" style="margin-bottom: 30px;margin-top: 15px;" ref="reply"></vue-comment>
        </transition>
    </div>
</template>

<script>
    import vueEmoji from '@/views/components/emoji/emoji.vue';
    import data from '@/views/components/emoji/data/emoji-data.js';
    import vueComment from '@/views/front/comment/comment.vue';
    import {_f_reply_list} from '@/api/reply';
    import util from '@/libs/util.js';

    let emojiData = {}
    Object.values(data).forEach(item => {
        emojiData = { ...emojiData, ...item }
    })
    export default {
        name: 'sub-comment-list',
        components:{vueEmoji,vueComment},
        data (){
            return{
                showEmoji: false,
                src:null,
                showButton:false,
                showComment:false,
                commentType:'reply',
                replies:[]
            }
        },
        props :{
            article: {
                type: Object
            },
            comment: {
                type:Object
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
              this.getReply();
            },
            onFocus() {
                this.showButton = true;
            },
            onCancel (){
                this.showButton = false;
                this.showEmoji = false;
                this.showComment = false;
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
            addReply (type,reply){
                this.showComment = true;
                if(type == 'reply'){
                    this.commentType = 'reply';
                    this.$refs.reply.handleType(type,this.$props.comment.id)
                }else if(type == 'reply2'){
                    this.commentType = 'reply2';
                    this.$refs.reply.handleType(type,reply)
                }

            },
            handleReply (type,commentId){
                this.showComment = true;
                this.$refs.reply.handleType(type,commentId)
            },
            getReply(){
                _f_reply_list(this.$props.comment.id).then(res=>{
                    console.log(res)
                    if(res.status === 200){
                        this.replies = res.data.data.content;
                    }
                }).catch(e =>{
                    console.log(e)
                })
            }

        },
        filters:{
            formatDate(time){
                var date = new Date(time);
                return util.formatDate(date, "yyyy-MM-dd hh:mm");
            },
            formatContent(content){

            }
        }

    };
</script>

<style scoped lang="less">
    .sub-comment-list {
        margin-top: 20px;
        padding: 5px 0 5px 20px;
        border-left: 2px solid #d9d9d9;
        margin-bottom: 30px;
        .sub-comment {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #f0f0f0;
            font-size: 14px;
            margin-left: 48px;
        }
        p {
            margin: 0 0 5px;
            font-size: 16px;
            line-height: 1.5;
            word-break: break-word!important;
            display: inline-block;
            a{
                text-decoration: none;
                cursor: pointer;
            }
            a:hover {
                color: #3194d0;
            }
        }
        .v-tooltip-container {
            position: relative;
            display: inline-block;
            .v-tooltip-content {
                display: inline-block;
            }
        }
        .sub-tool-group {
            font-size: 12px;
            color: #969696;
            a {
                color: #969696;
                text-decoration: none;
                cursor: pointer;
            }
            .report{
                float: right;
                margin: 1px 0 0 10px;
                display: none;
            }
        }
    }
    .sub-comment:last-child {
        margin: 0;
        padding: 0;
        border: none;
    }
    .sub-comment:nth-last-child(2) {
        margin: 0;
        padding: 0;
        border: none;
    }
    .more-comment {
        font-size: 14px;
        color: #969696;
        border: none;
        a{
            cursor: pointer;
            text-decoration: none;
        }
    }
    .add-comment-btn {
        color: #969696;
        font-size: 14px;
    }
    .line-warp {
        margin-left: 10px;
        padding-left: 10px;
        border-left: 1px solid #d9d9d9;
        font-size: 14px;
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
</style>
