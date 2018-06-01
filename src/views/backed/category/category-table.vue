<template>
    <Card>
        <p slot="title">
            <Icon type="gear-a"></Icon>
            栏目管理
        </p>
        <Row>
            <Col span="10" offset="1">
                <Card>
                    <p slot="title">
                        <Icon type="android-list"></Icon>
                        栏目一览
                    </p>
                    <Row>
                        栏目名称：<Input v-model="searchdata.name" placeholder="请输入栏目标题..." style="width: 200px;"/>
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary">搜索</Button></span>
                        <span @click="handleResetSearch" style="margin: 0 10px;"><Button type="primary">重置</Button></span>
                        <span @click="handleAdd" style="margin: 0 10px;"><Button type="primary">添加</Button></span>
                    </Row>
                    <Row style="margin-top: 1em;">
                        <Table :data="data" :columns="columns" :loading="loading" border></Table>
                    </Row>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="pagedata.total" :current="1" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col span="11" offset="1">
                <Card>
                    <p slot="title">
                        <Icon type="compose"></Icon>
                        栏目编辑
                    </p>
                    <Row>
                        栏目名称：<Input v-model="category.name" placeholder="请输入栏目名称..."/>
                    </Row>
                    <Row v-if="isEdit">
                        文章数：<Input v-model="editData.count" disabled/>
                    </Row>
                    <Row v-if="isEdit">
                        创建时间：<Input v-model="editData.createtime" disabled/>
                    </Row>
                    <Row style="margin-top: 1em;">
                        <Col span="6" offset="9">
                            <div style="width: 150px;">
                                <span @click="handleSubmit" style="margin: 0 5px;"><Button type="success">提交</Button></span>
                                <span @click="handleCancel" style="margin: 0 10px;"><Button type="primary">取消</Button></span>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </Card>
</template>

<script>
    import util from '@/libs/util.js';
    import {category_list, category_put, category_remove} from '@/api/category';

    export default {
        name: 'category-table',
        data(){
            return{
                searchdata: {
                    name: ''
                },
                pagedata:{
                    total: 0,
                    page:'0',
                    pageSize:'10',
                },
                isEdit:false,
                category:{
                    id: '',
                    name: ''
                },
                editData:{
                    count: '',
                    createtime: ''
                },
                loading: false,
                data:[],
                columns:[
                    {
                        title:'序号',
                        type:'index',
                        sortable:true,
                        width:80,
                        align: 'center'
                    },
                    {
                        title:'名称',
                        key:'name',
                        align: 'center'
                    },{
                        title: '文章数',
                        key:'count',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                        sortable: true,
                        render: (h, params) => {
                            const row = params.row;
                            let time = util.formatDate(new Date(parseInt(row.id)), 'yyyy-MM-dd hh:mm:ss');
                            return h('p', time)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h,params) =>{
                            return h('div',[
                                h('Button',{
                                    props: {
                                        type:'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let category = params.row;
                                            this.editCategory(category);
                                        }
                                    }
                                },'编辑'),
                                h('Poptip',{
                                    props:{
                                        confirm: true,
                                        title: '您确定要删除这条数据吗？',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () =>{
                                            let row = params.row;
                                            this.removeCategory(row,params.index)
                                        }
                                    }
                                },[
                                    h('Button',{
                                        style: {
                                            margin: '0 5px'
                                        },
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            placement: 'top'
                                        }
                                    },'删除')
                                ])
                            ])
                        }
                    }
                ],

            }
        },
        created() {
          this.init();
        },
        methods:{
            init (){
                this.initTable(0,this.pagedata.pageSize)
            },
            initTable(page,pageSize){
                this.loading = true;
                this.searchdata.page = page;
                this.searchdata.pageSize = pageSize;
                category_list(this.searchdata).then(resp =>{
                    console.log(resp)
                    if(resp.status === 200){
                        this.data = resp.data.data.content;
                        this.pagedata.total = resp.data.data.totalElements;
                    }
                    this.loading = false;
                }).catch(e =>{
                    console.error(e);
                })
            },
            changePage (page){
                this.initTable(page-1,this.pagedata.pageSize)
            },
            changePageSize(pageSize){
                this.pagedata.pageSize = pageSize;
                this.initTable(0,this.pagedata.pageSize);
            },
            handleSearch() {
                this.initTable(0,this.pagedata.pageSize);
            },
            handleResetSearch (){
                this.$set(this.searchdata,'name','');
            },
            handleAdd() {
                this.isEdit = false;
                this.$set(this.category,'id',new Date().getTime());
                this.$set(this.category,'name','');
                this.$set(this.editData,'count','');
                this.$set(this.editData,'createtime','')
            },
            handleSubmit (){
                if(this.category.name.length > 6){
                    this.$Message.error('栏目名称最长六位!');
                }else{
                    if(util.isNotEmpty(this.category.name)){
                        if(util.isEmpty(this.category.id)){
                            this.$set(this.category,'id',new Date().getTime());
                        }
                        category_put(this.category).then(resp =>{
                            if(resp.status === 200){
                                this.$Notice.success({
                                    title: '保存成功',
                                    duration: 5,
                                    desc: '栏目' + this.category.name + '保存成功'
                                });
                                this.init();
                            }else{
                                this.$Message.error('栏目'+ this.category.name +'报错失败');
                            }
                        }).catch(e =>{
                            console.error(e);
                        })
                    }
                }
            },
            handleCancel (){
                this.isEdit = false;
                this.$set(this.category,'id','');
                this.$set(this.category,'name','');
                this.$set(this.editData,'count','');
                this.$set(this.editData,'createtime','')
            },
            editCategory(category) {
                this.isEdit = true;
                this.$set(this.category,'id',category.id);
                this.$set(this.category,'name',category.name);
                this.$set(this.editData,'count',category.count);
                this.$set(this.editData,'createtime',util.formatDate(new Date(parseInt(category.id)), 'yyyy-MM-dd hh:mm:ss'))
            },
            removeCategory (category,index){
                category_remove(category.id).then(resp =>{
                    if(resp.status === 200){
                        this.$Notice.success({
                            title:'删除成功',
                            desc: '删除栏目'+category.name+'成功',
                            duration: 5
                        })
                        this.data.splice(index, 1);
                    }else{
                        this.$Message.error('删除失败!')
                    }
                }).catch(e =>{
                    console.error(e);
                })
            },
        }
    };
</script>

<style scoped>

</style>
