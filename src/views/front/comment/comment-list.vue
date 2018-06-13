<template>
    <div class="comment-list">
        <div>
            <vue-comment @onFocus="onFocus" @onCancel="onCancel" :articleId="articleId"></vue-comment>
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
                <div class="comment" v-for="(item,index) in comments">
                    <div>
                        <div class="comment-author">
                            <a href="/u/f9e4a7b1208a" target="_blank" class="avatar">
                                <img :src="item.commentAvatar">
                            </a>
                            <div class="info">
                                <a href="/u/f9e4a7b1208a" target="_blank" class="name">{{item.commentName}}</a>
                                <div class="meta"><span>{{index+1}}楼 · {{item.createDate | formatDate}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="comment-wrap">
                            <div class="comment-right">
                                <p v-html="item.content"></p>
                                <div class="tool-group">
                                    <a class="action-button">
                                        <Icon type="ios-heart-outline" style="margin-right: 4px;font-size: 20px; vertical-align:middle;"></Icon>
                                        <span style="font-size: 14px;">赞</span>
                                    </a>
                                    <a class="" @click="addReply(index)" style="margin-left: 10px;">
                                        <Icon type="ios-chatbubble-outline" style="margin-right: 4px;font-size: 23px; vertical-align:middle;"></Icon>
                                        <span style="font-size: 14px;" >回复</span>
                                    </a>
                                    <a class="report">
                                        <span style="font-size: 16px;">举报</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <sub-comment-list ref="subcommentlist" :articleId="articleId"></sub-comment-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import subCommentList from '@/views/front/comment/sub-comment-list.vue';
    import vueComment from '@/views/front/comment/comment.vue';
    import util from '@/libs/util.js';
    export default {
        name: 'comment-list',
        components:{vueComment,subCommentList},
        data (){
            return {
                showEmoji: false,
                commentText:'',
                src:null,
                marginTop:'30px',
                showButton:false,
                isFalse:false,
                isTrue:true,
                commentType:'comment'
            }
        },
        props:{
            articleId:{
                type: String
            },
            comments:Array
        },
        created (){

        },
        mounted (){

        },
        computed :{

        },
        methods :{
            onFocus (){
                this.marginTop = '60px';
            },
            onCancel (){
                this.marginTop = '30px';
            },
            addReply(index){
                this.$refs.subcommentlist[index].handleReply('reply');
            }
        },
        filters:{
            formatDate(time){
                var date = new Date(time);
                return util.formatDate(date, "yyyy-MM-dd hh:mm");
            },
        }
    };
</script>

<style scoped lang="less">
    .width{
        width: 620px;

    }
    .comment-list{
        padding-top: 20px;
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
        .comment:last-child {
            border-bottom: none;
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
