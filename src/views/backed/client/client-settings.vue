<template>
    <Card>
        <p slot="title">
            <Icon type="android-list"></Icon>
            基础配置
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="博客地址" prop="netUrl">
                <Input v-model="formValidate.netUrl" disabled >
                    <Button slot="append" icon="eye" style="width: 80px;background-color: #00a050;color: white;" @click="handlePreview">
                        预览
                    </Button>
                </Input>
            </FormItem>
            <FormItem label="博客名称" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"/>
            </FormItem>
            <FormItem label="博客标题" prop="title">
                <Input v-model="formValidate.title" placeholder="Enter your name"/>
            </FormItem>
            <FormItem label="favicon" prop="favicon">
                <Input v-model="formValidate.favicon" placeholder="Enter your name"/>
            </FormItem>
            <FormItem label="logo" prop="logo">
                <Input v-model="formValidate.logo" placeholder="Enter your name"/>
            </FormItem>
            <FormItem label="简介" prop="description">
                <Input v-model="formValidate.description" placeholder="Enter your name"/>
            </FormItem>
            <FormItem label="页脚" prop="footer">
                <Input v-model="formValidate.footer" placeholder="Enter your name"/>
            </FormItem>
            <FormItem label="公告" prop="announcement">
                <Input v-model="formValidate.announcement" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
            </FormItem>
            <FormItem>
                <Button type="success" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import {client_list} from '@/api/client';
    import {getUser} from '@/utils/auth';

    export default {
        name: 'client-from',
        data(){
            return{
                user:{},
                formValidate: {
                    netUrl: '',
                    name: '',
                    title: '',
                    favicon: '',
                    logo: '',
                    description: '',
                    footer: '',
                    announcement: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '博客名称不能为空！', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '博客标题不能为空！', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.init();
        },
        mounted(){

        },
        methods:{
            init(){
                this.user = JSON.parse(getUser());
                this.getClient();
            },
            getClient(){
                client_list().then(resp =>{
                    let client = resp.data.data;
                    if(client){
                        this.$set(this.formValidate,'netUrl',client.netUrl);
                    }else{
                        this.$set(this.formValidate,'netUrl','http://'+window.location.host+'/#/blog/'+this.user.username);
                        this.$set(this.formValidate,'name',this.user.username+'的博客');
                        this.$set(this.formValidate,'title','记录精彩的程序人生');
                    }
                }).catch(e =>{
                    console.log(e);
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handlePreview () {
                if(this.formValidate.netUrl.length > 0){
                    window.open(this.formValidate.netUrl,'_blank')
                }

            }
        }
    };
</script>

<style scoped>

</style>
