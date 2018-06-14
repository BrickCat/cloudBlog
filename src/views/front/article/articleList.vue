<template>
    <Row style="padding-top: 20px;padding-bottom: 20px;" :style="{height:this.height}">
        <transition name="fade">
            <Row v-if="False" style="text-align: center;vertical-align: middle;" :style="{height:height}">
                <Col span="24" style="margin-top: 1em;font-size: 18px;">
                    主人很懒，什么也没留下 >_<|||
                </Col>
                <Col span="24">
                    <img :src="src_404" style="width: 600px;height: 350px;margin-top: 13%;">
                </Col>
            </Row>
        </transition>
        <transition name="fade">
            <Col span="18" v-if="cardShow">
                <Card :bordered="False" dis-hover :padding="0">
                    <article-list-cell v-for="article in articles" :article="article"></article-list-cell>
                </Card>
                <pagnation v-if="pageShow" :total="pagedata.total" :current-page='1' :loading="loading" @pagechange="pagechange"></pagnation>
            </Col>
        </transition>
        <transition>
            <Col span="6" style="padding-right: 15px;" v-if="cardShow">
                <div>
                    <Card :bordered="False" dis-hover :padding="5">
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            热门文章
                        </p>
                        <div class="preview-placeholderCon">
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        </div>
                    </Card>
                </div>
                <div style="margin-top: 1em;">
                    <Card :bordered="False" dis-hover :padding="5">
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            最新文章
                        </p>
                        <div class="preview-placeholderCon">
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                            <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        </div>
                    </Card>
                </div>
                <div style="margin-top: 1em;">
                    <Card :bordered="False"  dis-hover :padding="10">
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            赞助商
                        </p>
                        <div style="height:auto;text-align:center;float:none;margin-left:auto;margin-right:auto;">
                            <img style="width:100%;height:auto;border-radius: 5px;" src="https://upload-images.jianshu.io/upload_images/5763769-1279ebea2272ac34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/389" alt="">
                        </div>
                    </Card>
                </div>
            </Col>
        </transition>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
</template>

<script>
    import ArticleListCell from './articleListCell';
    import Pagnation from '../../components/pagination/pagnation';
    import { getGuest } from '@/utils/auth'
    import {_f_article_list} from '@/api/article';
    import Particles from '../../blog_index/blog_index';

    export default {
        components: {Pagnation, Particles, ArticleListCell},
        data () {
            return {
                loading: false,
                articles:[],
                searchdata:{
                    title:'',
                    type:'',
                    status:''
                },
                pagedata:{
                    total: 1500,
                    page:'0',
                    pageSize:'10',
                },
                False:false,
                pageShow:false,
                spinShow: true,
                cardShow:false,
                height:'',
                src_404:require('../../../images/404/0.gif'),
            }
        },
        computed: {

        },
        filters: {

        },
        created () {
            this.height = document.body.offsetHeight+'px';

            if(this.$route.params.username){
                this.$store.commit("SET_GUEST",this.$route.params.username);
                this.init();
            }else{
                this.$Notice.error({
                    title: '错误消息',
                    desc:'请求错误，请重新访问主页或登录配置博客。'
                })
            }

        },
        methods: {
            init(){
                this.initTable(0,this.pagedata.pageSize);
            },
            initTable(page,pageSize){
                this.searchdata.username = this.$route.params.username;
                this.searchdata.page = page;
                this.searchdata.pageSize = pageSize;
                _f_article_list(this.searchdata).then(resq =>{
                    if(resq.data.status === 200){
                        let datas = resq.data.data.content;
                        for(let i = 0;i< datas.length;i++){
                            this.articles.push(datas[i]);
                        }
                        this.loading = false;
                        this.pagedata.total = resq.data.data.totalElements;
                        if(resq.data.data.totalElements > 10){
                            this.pageShow = true;
                        }
                        if(this.articles.length === 0){
                            this.False = true;
                            this.spinShow = false;
                            this.height = document.documentElement.clientHeight || document.body.clientHeight;
                            this.height = (this.height - 325)+'px';
                            this.src_404 = require('../../../images/404/'+parseInt(6*Math.random())+'.gif')
                        }else{
                            this.cardShow = true;
                            this.height = '100%';
                        }
                    }else{
                        this.$Message.error(resq.data.msg);
                    }
                    this.spinShow = false;
                }).catch(error =>{
                    console.error(error);
                })
            },
            pagechange (page){
                this.loading = true;
                this.initTable(page-1,this.pagedata.pageSize);

            }
        },
        mounted () {
        }
    };
</script>

<style scoped>

</style>
