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
            <comment-list :articleId="articleId" :comments.sync="comments"></comment-list>
        </Col>
    </Row>
</template>

<script>
    import {_f_article_get} from '@/api/article';
    import {list_comment} from '@/api/comment';
    import commentList from '@/views/front/comment/comment-list.vue';
    export default {
        name: 'article-detail',
        components:{commentList},
        data (){
            return {
                articleId: '',
                article:{},
                isFalse:false,
                isTrue:true,
                marginTop:'30px',
                codeStyle:'solarized-dark',
                preview:'preview',
                anthor:{},
                comments:[]

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
                    this.articleId = this.$route.params.articleId;
                }
                this.getArticle();
            },
            onFocus (){
                this.marginTop = '60px';
            },
            onCancel (){
                this.marginTop = '30px';
            },
            getArticle(){
                _f_article_get(this.articleId).then(res =>{
                    console.log(res)
                    if(res.status === 200){
                        this.article = res.data.data;
                        this.anthor = res.data.data.anthor;
                        document.title = this.article.title;
                        this.getComments(this.article.id);
                    }
                }).catch(e =>{
                    console.log(e);
                })
            },
            getComments(articleId){
                list_comment(articleId).then(res=>{
                    console.log(res);
                    if(res.status === 200){
                        this.comments = res.data.data.content;
                    }
                }).catch(e =>{
                    console.error(e);
                })
            }
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


</style>
