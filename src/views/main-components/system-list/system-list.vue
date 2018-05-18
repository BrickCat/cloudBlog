<template>
    <div @click="handleToSystem(system.url)" style="padding-left: 10px;padding-right: 10px;">
        <Tooltip :content="system.name" placement="bottom">
            <Avatar shape="square" :src="system.img" size="large" />
        </Tooltip>
    </div>
</template>

<script>
    export default {
        name: 'system-list',
        data(){
            return {

            }
        },
        props: {
           system:{
               type: Object
           }
        },
        methods:{
            handleToSystem:function (url) {
                window.open(url)
            }
        }
    };
</script>

<style scoped>

</style>
