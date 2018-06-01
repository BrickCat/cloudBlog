<template>
    <Card>
        <p slot="title">
            <Icon type="gear-a"></Icon>
            标签管理
        </p>
        <Row>
            <Col span="10" offset="1">
                <Card>
                    <p slot="title">
                        <Icon type="android-list"></Icon>
                        标签一览
                    </p>
                    <Row>
                        名称：<Input v-model="searchdata.name" placeholder="请输入标签名称..." style="width: 200px;"/>
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary">搜索</Button></span>
                        <span @click="handleResetSearch" style="margin: 0 10px;"><Button type="primary">重置</Button></span>
                        <span @click="handleAdd" style="margin: 0 10px;"><Button type="primary">添加</Button></span>
                    </Row>
                    <Row style="margin-top: 1em;">
                        <Table :data="data" :columns="columns" ref="taglist" :loading="loading" border></Table>
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
                        标签编辑
                    </p>
                    <Row>
                        <Col span="24" v-if="false">
                            <Input v-model="tag.id"/>
                        </Col>
                        <Col span="24">
                            标签名称：<Input v-model="tag.name" placeholder="请输入标签名称..."/>
                        </Col>
                        <Col span="24" v-if="isEdit">
                            使用频次：<Input v-model="editData.usecount" disabled/>
                        </Col>
                        <Col span="24" v-if="isEdit">
                            创建时间：<Input v-model="editData.createtime" disabled/>
                        </Col>
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
    import {tag_list, tag_put, tag_remove} from '@/api/tag';

    export default {
        name: 'TagList',
        data(){
            return {
                loading: false,
                isEdit:false,
                data:[],
                editData:{
                    usecount:'',
                    createtime:'',
                },
                tag:{
                    id: '',
                    name:''
                },
                pagedata:{
                    total: 0,
                    page:'0',
                    pageSize:'10',
                },
                searchdata:{
                    name:''
                },
                columns: [
                    {
                        title:'序号',
                        type: 'index',
                        width: 60,
                        align: 'center',

                    },{
                        title:'标签名称',
                        key: 'name',
                        align: 'center'
                    },{
                        title: '频次',
                        key: 'count',
                        width: 80,
                        sortable: true,
                        align: 'center',
                    },{
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                        sortable: true,
                        render: (h,params) =>{
                            const row = params.row;
                            let time = util.formatDate(new Date(parseInt(row.id)),'yyyy-MM-dd hh:mm:ss');
                            return h('p',time)
                        }
                    },{
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
                                            let tag = params.row;
                                            this.editTag(tag);
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
                                            console.log(row);
                                            this.data.splice(params.index, 1);
                                            this.removeTag(row.id);
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
                ]
            }
        },
        methods:{
            init(){
                this.initTable(0,this.pagedata.pageSize);
            },
            initTable(page,pageSize){
                this.loading = true;
                this.searchdata.page = page;
                this.searchdata.pageSize = pageSize;
                tag_list(this.searchdata).then(res =>{
                    console.log(res)
                    if(res.status === 200){
                        this.data = res.data.data.content;
                        this.pagedata.total = res.data.data.totalElements;
                    }
                    this.loading = false;
                }).catch(e =>{
                    console.error(e)
                })
            },
            changePage (page){
                this.initTable(page-1,this.pagedata.pageSize)
            },
            changePageSize(pageSize){
                this.pagedata.pageSize = pageSize;
                this.initTable(0,this.pagedata.pageSize);
            },
            handleSearch(){
                this.initTable(0,this.pagedata.pageSize);
            },
            handleResetSearch(){
                this.$set(this.searchdata,'name','');
            },
            handleAdd(){
                this.isEdit = false;
                this.$set(this.tag,'id',new Date().getTime());
                this.$set(this.tag,'name','');
            },
            editTag(tag){
                this.isEdit = true;
                this.$set(this.tag,'id',tag.id);
                this.$set(this.tag,'name',tag.name);
                this.$set(this.editData,'usecount',tag.count);
                this.$set(this.editData,'createtime',util.formatDate(new Date(parseInt(tag.id)),'yyyy-MM-dd hh:mm:ss'));
            },
            handleCancel(){
                this.isEdit = false;
                this.$set(this.tag,'id','');
                this.$set(this.tag,'name','');
                this.$set(this.editData,'usecount','');
                this.$set(this.editData,'createtime','');
            },
            handleSubmit(){
                if(this.tag.name.length === 0){
                    this.$Message.error('请输入标签名称!')
                }else{
                    if(this.tag.name.length >= 5){
                        this.$Message.error('标签名称不能超过5个字!');
                        return false;
                    }
                    tag_put(this.tag).then(reqs =>{
                        let data = reqs.data;
                        if(data.status === 200){
                            this.init();
                            this.handleCancel();
                            this.$Message.success('添加成功~')
                        }
                    }).catch(error =>{
                        console.error(error);
                    })
                }


            },
            removeTag(tagId){
                tag_remove(tagId).then(req =>{
                    if(req.data.status === 200){
                        this.$Message.success('删除成功~');
                    }
                }).catch(e =>{
                    console.log(e);
                })
            }
        },
        mounted (){
            this.init();
        }
    };
</script>

<style scoped>

</style>
