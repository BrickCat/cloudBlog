<template>
    <div class="new-comment">
        <div style="display: block;">
            <a class="avatar" v-if="showAvatar"><img src="//upload.jianshu.io/users/upload_avatars/4394289/ac6a385a-38fc-4bcf-a187-6fb59eeca8b8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114"></a>
            <textarea v-model="commentText" placeholder="写下你的评论..." @focus="onFocus" v-on:input="inputFunc" @keyup.ctrl.13="addComment"></textarea>
            <input type="text" ref="input" v-model="content">
            <div class="write-function-block" :style="{float:float}" v-if="showButton">
                <div class="emoji-modal-wrap">
                    <a class="emoji" @click="showEmoji = true">
                        <Icon style="font-size: 30px;color: #969696;" type="android-happy"></Icon>
                    </a>
                </div>
                <div class="hint">Ctrl+Enter 发表</div>
                <a class="btn btn-send" @click="addComment">发送</a>
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
</template>

<script>
    import {put_comment} from '@/api/comment';
    import vueEmoji from '@/views/components/emoji/emoji.vue';
    import data from '@/views/components/emoji/data/emoji-data.js';
    let emojiData = {}
    Object.values(data).forEach(item => {
        emojiData = { ...emojiData, ...item }
    })
    export default {
        name: 'comment',
        components:{vueEmoji},
        data (){
            return{
                showEmoji: false,
                commentText:'',
                content:'',
                src:null,
                showButton:false,
                showAvatar:true,
                float:'',
                type:'comment',
                comment:{}
            }
        },
        props:{
          articleId:{
              type:String
          }
        },
        created (){

        },
        mounted (){

        },
        methods :{
            selectEmoji(v){
                this.commentText += v;

            },
            onFocus() {
                this.showButton = true;
                this.$emit('onFocus')
            },
            onCancel (){
                this.showButton = false;
                this.showEmoji = false;
                this.$emit('onCancel')
            },
            inputFunc(){
                alert(this.commentText)
            },
            addComment() {
                if('comment' == this.type){
                    this.comment.id = new Date().getTime();
                    this.comment.articleId = this.$props.articleId;
                    this.comment.content = this.commentText
                    put_comment(this.comment).then(res =>{
                        if(res.status === 200){
                            this.$Message.success('评论成功！');
                        }
                        console.log(res)
                    }).catch(e =>{
                        console.log(e)
                    })
                }
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
            handleType(type){
                this.showButton = true;
                this.float = 'left!important';
                this.showAvatar = false;
                this.type = type;
            }
        },
        watch:{

        }
    };
</script>

<style scoped lang="less">
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
</style>
