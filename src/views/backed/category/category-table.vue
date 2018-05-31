<template>
    <Card>
        <p slot="title">
            <Icon type="android-list"></Icon>
            栏目管理
        </p>
        <Row>
            <Col span="10">
                <Row>
                    栏目名称：<Input v-model="searchdata.name" placeholder="请输入栏目标题..." style="width: 200px;"/>
                    <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary">搜索</Button></span>
                    <span @click="handleResetSearch" style="margin: 0 10px;"><Button type="primary">重置</Button></span>
                    <span @click="handleAdd" style="margin: 0 10px;"><Button type="primary">添加</Button></span>
                </Row>
                <Row style="margin-top: 1em;">
                    <Table :data="data" :columns="columns" :loading="loading" border></Table>
                </Row>
            </Col>
            <Col offset="1">

            </Col>
        </Row>
    </Card>
</template>

<script>
    import util from '@/libs/util.js';
    export default {
        name: 'category-table',
        data(){
            return{
                searchdata: {
                    mame: ''
                },
                pagedata:{
                    total: 0,
                    page:'0',
                    pageSize:'10',
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
                                            this.data.splice(params.index, 1);
                                            this.removeCategory(row.id)
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
        methods:{
            init (){
                this.initTable(0,this.pagedata.pageSize)
            },
            initTable(page,pageSize){

            },
            handleSearch() {

            },
            handleResetSearch (){
                this.$set(this.searchdata,'name','');
            },
            handleAdd() {

            },
            editCategory(category) {

            },
            removeCategory (id){

            }
        }
    };
</script>

<style scoped>

</style>
