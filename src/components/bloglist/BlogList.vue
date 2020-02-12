<template>
<div class="container" v-show="listShow">
    <el-card class="article_card" v-for="item in blogList" :key="item.id">
        <div class="header">
            <h1 class="title">{{item.title}}</h1>
            <span class="time">{{item.createtime}}</span>
        </div>
        <div class="content_container">
        <div class="content markdown-body" v-highlight v-html="item.content">
            {{item.content}}
        </div>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
    name: 'BlogList',
    data() {
        return {
        }
    },
    props: ['name', 'listShow', 'blogList'],
    watch: {
        name: function(newVal, oldVal) {
                this.page.category = newVal
        },
        listShow: function(newVal, oldVal) {
            this.listShow = newVal
        },
        blogList: function(newVal, oldVal) {
            this.blogList = newVal
        }
    }
}
</script>

<style scoped>
@import '../../assets/github-markdown-css/github-markdown.css';
.container{
    max-width: 1000px;
    margin: 0 auto;
}
.article_card{
    margin-top: 50px;
    margin-bottom: 80px;
}
.header{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 15px 30px 15px 40px;
}
.header .title{
    color: #696969;
    font-size: 26px;
}
.header .time{
    color: #999;
    font-size: 16px;
}
.content_container{
    padding: 20px 40px;
    border-top: 1px solid #999;
}
.content{
    text-align: left;
}
</style>
