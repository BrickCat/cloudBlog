<template>
    <Card>
        <p slot="title">
            <Icon type="android-list"></Icon>
            标签一览
        </p>
        <Row>
            <Col span="10">
                <Row>
                    名称：<Input v-model="searchdata.name" placeholder="请输入标签名称..." style="width: 200px;">
                    <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary">搜索</Button></span>
                    <span @click="handleResetSearch" style="margin: 0 10px;"><Button type="primary">重置</Button></span>
                </Row>
                <Row style="margin-top: 1em;">
                    <Table :data="data" :columns="columns" ref="taglist" :loading="loading" border></Table>
                </Row>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: 'TagList',
        data(){
            return {
                loading: false,
                data:[],
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
                        title:'标签名称'
                    }
                ]
            }
        }
    };
</script>

<style scoped>

</style>
