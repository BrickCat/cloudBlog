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
    import {list} from '../../../api/article';

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
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
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
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ]
            }
        },
        created (){

        },
        mounted (){

        },
        watch:{

        },
        methods:{
            init (){
                this.initTable(0,this.pagedata.pageSize);
            },
            initTable(page,pageSize){
                this.loading = true;
                var params = new URLSearchParams();
                params.append('page',page);
                params.append('pageSize',pageSize);
                params.append('username',this.searchdata.username);
                params.append('type',this.searchdata.type);
                params.append('status',this.searchdata.status);
                list(params).then(res =>{
                    console.log(res);
                    if(res.status===200){
                        this.data = res.data.content;
                        this.pagedata.total = res.data.totalElements;
                    }
                    this.loading = false;
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
            }
        }
    };
</script>

