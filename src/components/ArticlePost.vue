<template>
    <div id="editor">
        <mavon-editor style="height: 100%;width: 100%;" v-model="article.markdownContent" ref=md></mavon-editor>
        <el-button @click="saveArticle">发布</el-button>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'

    export default {
        name: "ArticlePost",
        methods: {
            saveArticle() {
                const _this = this;
                const articleAddUrl = 'http://localhost:8081/article';
                _this.article.htmlContent = _this.$refs.md.d_render;
                _this.article.title = 'firstOne';
                axios.post(articleAddUrl, _this.article).then(function () {
                    _this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                }).catch(function () {
                    _this.$message({
                        type: 'info',
                        message: '发布失败！'
                    })
                });
            }
        },
        data() {
            return {
                article: {
                    markdownContent: '',
                    htmlContent: '',
                    title: '',
                    id: 1,
                }
            }
        },
        components: {
            mavonEditor
        },
    }
</script>

<style scoped>

</style>