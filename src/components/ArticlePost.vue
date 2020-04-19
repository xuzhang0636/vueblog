<template>
    <div id="editor">
        <mavon-editor style="height: 100%;width: 100%;" v-model="content" ref=md></mavon-editor>
        <el-button @click="saveArticle">发布</el-button>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: "ArticlePost",
        methods: {
            saveArticle() {
                alert(this.$refs.md.d_render);
            }
        },
        data() {
            return {
                article: {
                    mdContent: '',
                    htmlContent: '',
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