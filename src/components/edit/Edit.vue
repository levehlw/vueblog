<template>
    <div class="container">
        <div class="top">
        <el-page-header @back="goBack" content="博客">
        </el-page-header>
            <div class="title">
                <el-select v-model="category" placeholder="请选择分类">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
                <el-input v-model="title" placeholder="请输入文章标题"></el-input>
                <el-button type="success" @click="submit">发布</el-button>
            </div>
        </div>
        <mavon-editor
            :ishljs = "true" fontSize="24px"
            v-model="content" ref="md" codeStyle="darkula"
            @change="change" :toolbars="{}"
            style="min-height: 600px;"/>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
export default {
    // 注册
    components: {
        mavonEditor
    },
    data() {
        return {
            content: '',
            html: '',
            title: '',
            category: '',
            isupdate: false,
            id: 0,
            options: [
                {
                    label: '前端',
                    value: '前端'
                },
                {
                    label: '数据结构',
                    value: '数据结构'
                },
                {
                    label: '算法',
                    value: '算法'
                },
                {
                    label: '后台',
                    value: '后台'
                }
            ]
        }
    },
    created () {
        const article = this.$route.query.blog
        if(article) {
            this.content = article.markdown
            this.title = article.title
            this.category = article.category
            this.isupdate = true
            this.id = article.id
        }
    },
    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.html = render
        },
        // 提交
        async submit() {
            const article = {
                title: this.title,
                content: this.html,
                author: 'leve',
                category: this.category,
                markdown: this.content
            }
            if(!this.isupdate) {
                const { data: res } = await this.$http.post('blog/new', article)
                if (res.errno === 0) this.$message.success('发布成功')
                else this.$message.error('发布失败')
            } else{
                article.id = this.id
                const { data: res} = await this.$http.post('blog/update', article)
                if (res.errno === 0) this.$message.success('发布成功')
                else this.$message.error('发布失败')
            }
            this.$router.push('/')
        },
        // 返回
        goBack() {
            this.$router.push('/')
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.container{
    height: 100%;
}
.el-page-header{
    margin-left: 15px;
}
.top{
    background-color: rgba(204, 204, 204, 0.616);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-left: 15px;
    padding-right: 15px;
}
.title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
}
.title .el-select{
    margin-right: 15px;
}
.title .el-input{
    margin-right: 15px;
}
</style>
