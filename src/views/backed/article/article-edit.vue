<style lang="less">
    @import '../../../styles/common.less';
    @import './less/article-publish.less';
    @import './less/add-article.less';
</style>

<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <Form label-position="top">
                        <FormItem :error="articleError">
                            <Input size="large" placeholder="标题" v-model="article.title"  icon="android-list"/>
                        </FormItem>
                    </Form>
                    <div class="margin-top-10">
                        <mavon-editor style="height: 614px;background-color: white;border-radius: 3px;" class="content" v-model="article.article_md"
                                      :toolbars="toolbars"
                                      :toolbarsFlag="isTrue"
                                      :ishljs = "true"
                                      :code_style="codeStyle"
                                      :default_open="preview"
                                      :subfield="isTrue"
                                      @imgAdd="$imgAdd"
                                      @imgDel="$imgDel"/>
                    </div>
                </Card>
            </Col>
            <Col span="6" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        发布
                    </p>
                    <p class="margin-top-10">
                        <Icon type="android-time"></Icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
                        <Select size="small" style="width:90px" v-model="article.status">
                            <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
                        <Button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="text">修改</Button>
                        <transition name="openness-con">
                            <div v-show="editOpenness" class="openness-radio-con">
                                <RadioGroup v-model="currentOpenness" vertical>
                                    <Radio label="0">
                                        公开
                                        <Checkbox v-show="currentOpenness === '0'" v-model="article.topArticle">在首页置顶这篇文章</Checkbox>
                                    </Radio>
                                    <Radio label="1">
                                        密码
                                        <Input v-show="currentOpenness === '1'" v-model="article.password" style="width:120px" size="small" placeholder="请输入密码"/>
                                    </Radio>
                                    <Radio label="2">
                                        私密
                                    </Radio>
                                </RadioGroup>
                                <div>
                                    <Button @click="handleSaveOpenness" type="success">确认</Button>
                                    <Button type="ghost" @click="cancelEditOpenness">取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                        <span v-if="publishTimeType === 'immediately'">立即发布</span><span v-else>定时：{{ pushTime }}</span>
                        <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
                        <transition name="publish-time">
                            <div v-show="editPublishTime" class="publish-time-picker-con">
                                <div class="margin-top-10">
                                    <DatePicker @on-change="setPublishTime" :value="article.date" type="datetime" style="width:200px;" placeholder="选择日期和时间" ></DatePicker>
                                </div>
                                <div class="margin-top-10">
                                    <Button type="success" @click="handleSavePublishTime">确认</Button>
                                    <Button type="ghost" @click="cancelEditPublishTime">取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <Row class="margin-top-20 publish-button-con">
                        <span class="publish-button"><Button @click="handleSaveDraft">保存草稿</Button></span>
                        <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="success">发布</Button></span>
                    </Row>
                </Card>
                <div class="margin-top-10">
                    <Card>
                        <p slot="title">
                            <Icon type="navicon-round"></Icon>
                            分类目录
                        </p>
                        <Tabs type="card">
                            <TabPane label="所有分类目录">
                                <div class="classification-con">
                                    <Tree :data="classificationList" @on-check-change="setClassificationInAll" show-checkbox></Tree>
                                </div>
                            </TabPane>
                            <TabPane label="常用目录">
                                <div class="classification-con">
                                    <CheckboxGroup v-model="offenUsedClassSelected" @on-change="setClassificationInOffen">
                                        <p v-for="item in offenUsedClass" :key="item.title">
                                            <Checkbox :label="item.value">{{ item.title }}</Checkbox>
                                        </p>
                                    </CheckboxGroup>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
                <div class="margin-top-10">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-pricetags-outline"></Icon>
                            标签
                        </p>
                        <Row>
                            <Col span="18">
                                <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择文章标签">
                                    <Option v-for="item in articleTagList" :value="item.id" :key="item.name">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="6" class="padding-left-10">
                                <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="ghost">新建</Button>
                            </Col>
                        </Row>
                        <transition name="add-new-tag">
                            <div v-show="addingNewTag" class="add-new-tag-con">
                                <Col span="14">
                                    <Input v-model="newTagName" placeholder="请输入标签名" />
                                </Col>
                                <Col span="5" class="padding-left-10">
                                    <Button @click="createNewTag" long type="success">添加</Button>
                                </Col>
                                <Col span="5" class="padding-left-10">
                                    <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                                </Col>
                            </div>
                        </transition>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {put, get} from '@/api/article';
    import util from '@/libs/util';
    import {tag_put, tag_list_component} from '@/api/tag';

    export default {
        name: 'artical-publish',
        data () {
            return {
                isTrue:true,
                isFalse:false,
                img_file: {},
                codeStyle:'solarized-dark',
                preview:'preview',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                article:{
                    id:'',
                    title: '',
                    userId: '',
                    article_md: '',
                    article_html:'',
                    status: '0',
                    topArticle: false,
                    type:'',
                    password: '',
                    date:'',
                    tag:[],
                    classification:[],
                    offenUsedClass:[]
                },
                pushTime:'',
                articleError: '',
                articleStateList: [{name: '草稿',value:'0'}, {name: '等待复审',value:'1'}],
                editOpenness: false,
                Openness: '公开',
                currentOpenness: '0',
                publishTimeType: 'immediately',
                editPublishTime: false,  // 是否正在编辑发布时间
                articleTagSelected: [],  // 文章选中的标签
                articleTagList: [],  // 所有标签列表
                classificationList: [],
                classificationSelected: [],  // 在所有分类目录中选中的目录数组
                offenUsedClass: [],
                offenUsedClassSelected: [],  // 常用目录选中的目录
                classificationFinalSelected: [],  // 最后实际选择的目录
                publishLoading: false,
                addingNewTag: false,  // 添加新标签
                newTagName: ''// 新建标签名
            };
        },
        created(){
            this.init();
        },
        methods: {
            init(){
                this.getArticle();

            },
            $imgAdd(){

            },
            $imgDel(){

            },
            getArticle(){
                let articleId = this.$route.query.articleId;
                if(articleId){
                    get(articleId).then(resq =>{
                        if(resq.data.status ===200){
                            let article = resq.data.data;
                            this.$set(this.article,'id',article.id);
                            this.$set(this.article,'userId',article.userId);
                            this.$set(this.article,'title',article.title);
                            this.$set(this.article,'password',article.password);
                            this.$set(this.article,'article_md',article.article_md);
                            this.$set(this.article,'article_html',article.article_html);
                            this.$set(this.article,'status',article.status);
                            this.$set(this.article,'topArticle',article.topArticle);
                            this.$set(this.article,'type',article.type);
                            if(article.type === '0'){
                                this.currentOpenness = '0';
                                this.Openness = '公开';
                            }else if(article.type === '1'){
                                this.currentOpenness = '1';
                                this.Openness = '密码';
                                this.$set(this.article,'password',article.password);
                            }else if(article.type === '2'){
                                this.currentOpenness = '1';
                                this.Openness = '私密';
                            }
                            this.$set(this.article,'date',article.date);
                            this.pushTime = util.formatDate(new Date(article.date),'yyyy-MM-dd hh:mm:ss');
                            this.publishTimeType = 'timing';

                            if(util.isNotEmpty(article.offenUsedClass)){
                                this.offenUsedClassSelected = article.offenUsedClass.split(',');
                                this.$set(this.article,'offenUsedClass',article.offenUsedClass.split(','));
                            }
                            if(util.isNotEmpty(article.classification)){
                                this.classificationSelected = article.classification.split(',');
                                this.$set(this.article,'classification',article.classification.split(','))
                            }
                            this.getTagList();
                            this.articleTagSelected = article.tags;
                            this.$set(this.article,'tag',article.tags.toString());

                        }else{
                            this.$Notice.error({
                                title: '错误提示',
                                desc: resq.data.msg
                            });
                        }
                    }).catch(error =>{
                        console.error(error);
                    })
                }else{
                    this.$Message.error('未能找到该文章!');
                }
            },
            handleEditOpenness () {
                this.editOpenness = !this.editOpenness;
            },
            handleSaveOpenness () {
                this.Openness = this.currentOpenness;
                if(this.currentOpenness === '0'){
                    this.Openness = '公开'
                    this.editOpenness = false;
                }else if(this.currentOpenness === '1'){
                    this.Openness = '密码'
                    if(this.article.password.length === 0){
                        this.$Message.error('请输入密码');
                        this.editOpenness = true;
                    }else{
                        this.editOpenness = false;
                    }
                }else if(this.currentOpenness === '2'){
                    this.Openness = '私密';
                    this.editOpenness = false;
                }
            },
            cancelEditOpenness () {
                this.currentOpenness = this.Openness;
                this.editOpenness = false;
            },
            handleEditPublishTime () {
                this.editPublishTime = !this.editPublishTime;
            },
            handleSavePublishTime () {
                this.publishTimeType = 'timing';
                this.editPublishTime = false;
            },
            cancelEditPublishTime () {
                this.publishTimeType = 'immediately';
                this.editPublishTime = false;
            },
            setPublishTime (datetime) {
                this.pushTime = datetime;
            },
            setClassificationInAll (selectedArray) {
                this.classificationFinalSelected = selectedArray.map(item => {
                    return item.id;
                });
                localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected); // 本地存储所选目录列表
            },
            setClassificationInOffen (selectedArray) {
                this.classificationFinalSelected = selectedArray;
            },
            handleAddNewTag () {
                this.addingNewTag = !this.addingNewTag;
            },
            createNewTag () {
                for(let i = 0; i<this.articleTagList.length; i++){
                    let name = this.articleTagList[i].name;
                    if(this.newTagName === name){
                        this.$Message.error('该标签已存在！');
                        return false;
                    }
                }

                if(this.articleTagSelected.length == 3){
                    this.$Message.info('最多只能选择三个标签');
                    return false;
                }

                if (this.newTagName.length !== 0) {
                    let tag = {
                        id:new Date().getTime(),
                        name:this.newTagName
                    }
                    tag_put(tag).then(reqs =>{
                        let data = reqs.data;
                        if(data.status === 200){
                            this.articleTagList.push(tag);
                            this.articleTagSelected.push(tag.id);
                            this.addingNewTag = false;
                            setTimeout(() => {
                                this.newTagName = '';
                            }, 200);
                            this.$Message.success('添加成功~')
                        }
                    }).catch(error =>{
                        console.error(error);
                    })

                } else {
                    this.$Message.error('请输入标签名');
                }
            },
            cancelCreateNewTag () {
                this.newTagName = '';
                this.addingNewTag = false;
            },
            canPublish () {
                if (this.article.title.length === 0) {
                    this.$Message.error('请输入文章标题');
                    return false;
                } else {
                    return true;
                }
            },
            handleSaveDraft () {
                if (!this.canPublish()) {
                    //
                }
            },
            handlePublish () {
                if (this.canPublish()) {
                    this.publishLoading = true;
                    this.$set(this.article,'tag',this.articleTagSelected.toString());
                    this.$set(this.article,'type',this.currentOpenness);
                    this.$set(this.article,'date',new Date(this.pushTime));
                    this.$set(this.article,'classification',this.classificationSelected.toString());
                    this.$set(this.article,'offenUsedClass',this.offenUsedClassSelected.toString());
                    put(this.article).then(resp =>{
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: '保存成功',
                            duration: 5,
                            desc: '文章《' + this.article.title + '》保存成功'
                        });
                        this.$router.push({
                            name:'article-list'
                        })
                    }).catch(error =>{
                        this.publishLoading = false;
                        this.$Notice.error({
                            title: '保存失败',
                            desc: error
                        });
                        console.error(error);
                    });
                }
            },
            handleSelectTag () {
                if(this.articleTagSelected.length > 3){
                    this.$Message.info('最多只能选择三个标签');
                    let tags = [];
                    tags[0] = this.articleTagSelected[0];
                    tags[1] = this.articleTagSelected[1];
                    tags[2] = this.articleTagSelected[2];
                    this.articleTagSelected = tags;
                }
            },
            getTagList(){
                tag_list_component(this.article.userId).then(resq =>{
                    let tags = resq.data.data;
                    this.articleTagList = tags;
                }).catch(e =>{
                    console.log(e)
                })
            }
        },
        computed: {

        },
        mounted () {
            this.classificationList = [
                {
                    id:'1',
                    title: 'Vue实例',
                    expand: true,
                    children: [
                        {
                            id:'11',
                            title: '数据与方法',
                            expand: true
                        },
                        {
                            id:'12',
                            title: '生命周期',
                            expand: true
                        }
                    ]
                },
                {
                    id:'2',
                    title: 'Class与Style绑定',
                    expand: true,
                    children: [
                        {
                            id:'21',
                            title: '绑定HTML class',
                            expand: true,
                            children: [
                                {
                                    id:'211',
                                    title: '对象语法',
                                    expand: true
                                },
                                {
                                    id:'212',
                                    title: '数组语法',
                                    expand: true
                                },
                                {
                                    id:'213',
                                    title: '用在组件上',
                                    expand: true
                                }
                            ]
                        },
                        {
                            id:'22',
                            title: '生命周期',
                            expand: true
                        }
                    ]
                },
                {
                    id:'3',
                    title: '模板语法',
                    expand: true,
                    children: [
                        {
                            id:'31',
                            title: '插值',
                            expand: true
                        },
                        {
                            id:'32',
                            title: '指令',
                            expand: true
                        },
                        {
                            id:'33',
                            title: '缩写',
                            expand: true
                        }
                    ]
                }
            ];
            this.offenUsedClass = [
                {
                    title: 'vue实例',
                    value: '0',
                },
                {
                    title: '生命周期',
                    value: '1',
                },
                {
                    title: '模板语法',
                    value: '2',
                },
                {
                    title: '插值',
                    value: '3',
                },
                {
                    title: '缩写',
                    value: '4',
                }
            ];
        },
    };
</script>
