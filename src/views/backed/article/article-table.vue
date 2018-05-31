<template>
    <Card>
        <p slot="title">
            <Icon type="android-list"></Icon>
            文章一览
        </p>
        <Row>
            姓名：<Input v-model="searchdata.title" placeholder="请输入文章标题..." style="width: 200px" />
            公开度：<Select v-model="searchdata.type" style="width:200px">
                    <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
            &nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：<Select v-model="searchdata.status" style="width:200px">
                        <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>

            <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary">搜索</Button></span>
            <span @click="handleResetSearch" style="margin: 0 10px;"><Button type="primary">重置</Button></span>
            <span style="margin: 0 10px;"><a id="hrefToExportTable"></a><Button type="primary" @click="exportExcel">导出</Button></span>
        </Row>
        <Row style="margin-top: 1em;">
            <Table :data="data" :columns="columns" ref="articlelist" :loading="loading" border></Table>
        </Row>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pagedata.total" :current="1" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import table2excel from '@/libs/table2excel.js';
    import util from '@/libs/util.js';
    import {list,romove} from '@/api/article';

    export default {
        name: 'article-table',
        data (){
            return {
                loading: false,
                data:[],
                pagedata:{
                    total: 0,
                    page:'0',
                    pageSize:'10',
                },
                searchdata:{
                    title:'',
                    type:'',
                    status:''
                },
                types: [{
                    label: '公开',
                    value: '0'
                },{
                    label: '密码',
                    value: '1'
                },{
                    label: '私密',
                    value: '2'
                }],
                status: [{
                    label: '草稿',
                    value: '0'
                },{
                    label: '等待复审',
                    value: '1'
                }],
                columns: [
                    {
                        title:'序号',
                        type:'index',
                        sortable:true,
                        width:80,
                        align:'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('a', {
                                    attrs:{
                                            href:'http://www.baidu.com'
                                        }
                                    },params.row.title);
                        }
                    },
                    {
                        title: '作者',
                        key: 'author',
                        align: 'center',
                        render: (h,params) => {
                            const row = params.row;
                            return h('p',row.anthor.username);
                        }
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        render: (h,parmas) =>{
                            const row = parmas.row;
                            let color;
                            let text;
                            if(row.status == '0'){
                                color = 'yellow';
                                text = '草稿';
                            }else{
                                color = 'green';
                                text = '已发布'
                            }
                            return h('Tag',{
                                props:{
                                    color:color,
                                    type:'border'
                                }
                            },text)
                        }
                    },
                    {
                        title:'公开度',
                        align: 'center',
                        key: 'type',
                        render: (h,parmas)=>{
                            const row = parmas.row;
                            let color;
                            let text;
                            if(row.type == '0'){
                                color = 'green';
                                text = '公开';
                            }else if(row.type == '1'){
                                color = 'yellow';
                                text = '密码'
                            }else{
                                color = 'red';
                                text = '私密'
                            }
                            return h('Tag',{
                                props:{
                                    color:color,
                                    type:'dot'
                                }
                            },text)
                        }
                    },
                    {
                        title: '是否置顶',
                        align: 'center',
                        key: 'topArticle',
                        render: (h,parmas)=>{
                            const row = parmas.row;
                            let color;
                            let text;
                            if(row.topArticle){
                                color = 'red';
                                text = '是';
                            }else{
                                color = 'blue';
                                text = '否';
                            }
                            return h('Tag',{
                                props:{
                                    color:color,
                                    type: 'border'
                                }
                            },text)
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center',
                        sortable: true,
                            render:(h,params) => {
                            const row = params.row;
                            let time = util.formatDate(new Date(row.createDate),'yyyy-MM-dd hh:mm:ss');
                            return h('p',time);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.editArticle(params.row.id)
                                                }
                                            }
                                        }, '编辑'),
                                        h('Poptip', {
                                            props: {
                                                confirm: true,
                                                title: '您确定要删除这条数据吗?',
                                                transfer: true
                                            },
                                            on: {
                                                'on-ok': () => {
                                                    this.data.splice(params.index, 1);
                                                    this.deleteArticle(params.row.id);
                                                }
                                            }
                                        }, [
                                            h('Button', {
                                                style: {
                                                    margin: '0 5px'
                                                },
                                                props: {
                                                    type: 'error',
                                                    size: 'small',
                                                    placement: 'top'
                                                }
                                            }, '删除')
                                        ])
                                    ]);
                        }
                    }
                ]
            }
        },
        created (){

        },
        mounted (){
            this.init();
        },
        watch:{

        },
        methods:{
            init (){
                this.initTable(0,this.pagedata.pageSize);
            },
            initTable(page,pageSize){
                this.loading = true;
                this.searchdata.page = page;
                this.searchdata.pageSize = pageSize;
                list(this.searchdata).then(res =>{
                    console.log(res);
                    if(res.status===200){
                        this.data = res.data.data.content;
                        this.pagedata.total = res.data.data.totalElements;
                    }
                    this.loading = false;
                }).catch(error=>{
                    console.error(error)
                });
            },
            changePage (page){
                this.initTable(page-1,this.pagedata.pageSize)
            },
            changePageSize(pageSize){
                this.pagedata.pageSize = pageSize;
                this.initTable(0,this.pagedata.pageSize);
            },
            handleSearch (){
                this.initTable(0,this.pagedata.pageSize);
            },
            handleResetSearch (){
                this.$set(this.searchdata,'title','');
                this.$set(this.searchdata,'type','');
                this.$set(this.searchdata,'status','');
            },
            exportExcel (){
                table2excel.transform(this.$refs.articlelist, 'hrefToExportTable', '文章一览');
            },
            editArticle(id) {
                let query = {articleId:id};
                this.$router.push({
                    name:'article-edit',
                    query:query
                })
            },
            deleteArticle(articleId){
                romove(articleId).then(resq =>{
                    if(resq.data.data.status === 200){
                        this.$Message.success('删除成功~');
                    }else {
                        this.$Message.error('删除失败~');
                    }
                }).catch(error =>{
                    console.error(error);
                })
            }
        }
    };
</script>

