<template>
    <Row style="padding-top: 20px;padding-bottom: 20px;">
        <Col span="17" offset="1">
            <Card>
                <article-list-cell v-for="article in 10" :article="article"></article-list-cell>
            </Card>
        </Col>
        <Col span="4" offset="1" class="padding-left-10">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        热门文章
                    </p>
                    <div class="preview-placeholderCon">
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                    </div>
                </Card>
            </div>
            <div style="margin-top: 1em;">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        最新文章
                    </p>
                    <div class="preview-placeholderCon">
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                        <div style="height: 40px;margin-bottom: 10px;background: #9fafd4;border-radius: 3px;"></div>
                    </div>
                </Card>
            </div>
        </Col>
    </Row>
</template>

<script>
    import ArticleListCell from './articleListCell';
    import {fetchList} from '@/api/article';

    export default {
        components: {ArticleListCell},
        data () {
            return {

            }
        },
        computed: {

        },
        filters: {

        },
        created () {

        },
        methods: {

        },
        mounted () {

        }
    };
</script>

<style scoped>

</style>
