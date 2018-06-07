<template>
    <Row>
        <ul class="pagination">
            <!--<li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> « </a></li>
            <li v-for="p in grouplist" :class="{'active': current == p.val}">
                <a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
            </li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> » </a></li>-->
            <!--<li :class="{'disabled': current == 1}" style="width: 48%;border-top-left-radius: 5px;border-bottom-left-radius: 5px;">
                <a href="javascript:;" @click="setCurrent(current - 1)" style="border-top-left-radius: 5px;border-bottom-left-radius: 5px;vertical-align: middle;display: flex;justify-content:center;align-items:Center;">
                    <Icon size="30" type="arrow-left-b" style="margin-right: .5em"></Icon>
                    上一页
                </a>
            </li>-->
            <!--<li style="width: 4%;text-align: center;line-height: 48px;border-radius: 6px;height: 48px;">-->
                <!--<span style="height: 36px;width:36px;border-radius: 5px;background-color: white;font-size: 12px;font-weight: bold;padding: 2px;">-->
                    <!--{{current}}-->
                <!--</span>-->
            <!--</li>-->
            <li :class="{'disabled': current == page}" style="width: 100%;border-radius: 5px;border: 1px #CFCFCF solid;" :style="{backgroundColor:backgroundColor}">
                <a href="javascript:;" @click="setCurrent(current + 1)" style="border-radius: 5px;">
                    <Spin v-if="loading" fix style="display: flex;justify-content:center;align-items:Center;color: #C0C0C0;">
                        <Icon type="load-c" size=18 class="demo-spin-icon-load" style="margin-right: .5em;"></Icon>
                        努力加载中...
                    </Spin>
                    <span v-if="!loading" :style="{color:color}">{{loadText}}</span>
                </a>
            </li>
        </ul>
    </Row>
</template>

<script>
    export default {
        name: 'pagnation',
        data(){
            return {
                current: this.currentPage,
                disabled:false,
                loadText:'加载更多...',
                color:'#c0c0c0',
                backgroundColor: '',
            }
        },
        props: {
            total: {// 数据总条数
                type: Number,
                default: 0
            },
            display: {// 每页显示条数
                type: Number,
                default: 10
            },
            currentPage: {// 当前页码
                type: Number,
                default: 1
            },
            pagegroup: {// 分页条数
                type: Number,
                default: 5,
                coerce: function (v) {
                    v = v > 0 ? v : 5;
                    return v % 2 === 1 ? v : v + 1;
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            page() { // 总页数
                return Math.ceil(this.total / this.display);
            },
            grouplist() { // 获取分页页码
                var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
                if (len <= this.pagegroup) {
                    while (len--) {
                        temp.push({text: this.page - len, val: this.page - len});
                    }
                    ;
                    return temp;
                }
                while (len--) {
                    temp.push(this.page - len);
                }
                ;
                var idx = temp.indexOf(center);
                (idx < count) && ( center = center + count - idx);
                (this.current > this.page - count) && ( center = this.page - count);
                temp = temp.splice(center - count - 1, this.pagegroup);
                do {
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                } while (temp.length);
                if (this.page > this.pagegroup) {
                    (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
                    (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
                }
                return list;
            }
        },
        methods: {
            setCurrent (idx) {
                if (this.current != idx && idx > 0 && idx < this.page + 1) {
                    this.current = idx;
                    this.$emit('pagechange', this.current);
                }
                if(this.page === idx){
                    this.loadText = '没有更多啦~';
                    this.color = '#FFFFFF';
                    this.backgroundColor= '#C0C0C0';
                    this.disabled = true;
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .pagination {
        overflow: hidden;
        display: table;
        margin: 0 auto;
        height: 48px;
        width: 100%;
            li {
                list-style:none;
                float: left;
                height: 48px;
                background-color: white;
                &
                :hover {
                    background: #CFCFCF;

                    a {
                        color: white;
                    }

                }
                a {
                    display: block;
                    height: 48px;
                    color: #C0C0C0;
                    text-align: center;
                    line-height: 48px;
                    font-size: 15px;
                    text-decoration: none
                }

            }
        .active {
            background: #CFCFCF;

            a {
                color: white;
            }

        }
    }
</style>
