<template>
    <Row style="padding-top: 20px;padding-bottom: 20px;" :style="{height:this.height}">
        <transition name="fade">
            <Col span="18" v-if="!spinShow">
                <Card :bordered="False" dis-hover :padding="0">
                    <article-list-cell v-for="article in articles" :article="article"></article-list-cell>
                </Card>
            </Col>
        </transition>
        <transition>
            <Col span="6" style="padding-right: 15px;" v-if="!spinShow">
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
    import {list} from '@/api/article';

    export default {
        components: {ArticleListCell},
        data () {
            return {
                articles:[],
                searchdata:{
                    title:'',
                    type:'',
                    status:''
                },
                False:false,
                spinShow: true,
                height:''
            }
        },
        computed: {

        },
        filters: {

        },
        created () {
            this.height = document.body.offsetHeight+'px';
            this.init();
        },
        methods: {
            init(){
                list(this.searchdata).then(resq =>{
                   this.articles = resq.data.data.content
                    setTimeout(() => {
                        this.spinShow=false;
                        this.height = '100%';
                    }, 3000);
                }).catch(error =>{
                    console.error(error);
                })
            }
        },
        mounted () {

        }
    };
</script>

<style scoped>

</style>
