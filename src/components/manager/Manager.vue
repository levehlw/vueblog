<template>
    <div class="container" v-show="showPanel">
        <div class="content">
            <div class="top">
                <el-form :model="form" :inline="true" style="padding-left: 50px;">
                    <el-form-item label="筛选：" >
                        <el-select placeholder="日期" style="width:140px;" v-model="form.filetime">
                        <el-option v-for="item in date" :key="item.name" :label="item.filetime" :value="item.filetime"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="分类" v-model="form.category" style="margin-left: 40px;">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in categories" :key="item.id"  :label="item.Name" :value="item.Name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  style="margin-left: 40px;width: 200px;">
                        <el-input v-model="form.keyword" placeholder="请输入文章关键词"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left:40px;">
                        <el-button type="primary" @click="onSubmit()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bottom">
                <el-card v-for="item in blogList" :key="item.id" class="card-item" shadow="hover">
                    <div class="item-title">{{item.title}}</div>
                    <div class="item-edit">
                        <div class="edit-time">{{item.createtime}}</div>
                        <div class="edit-control">
                            <a href="#" @click="onRead(item)">查看</a><a href="#" @click="onUpdate(item)">编辑</a><a style="color:#CA0C16;" href="#" @click="onDelete(item.id)">删除</a>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Manager',
    data() {
        return {
            form: {
                filetime: '',
                category: '',
                keyword: '',
                pageNum: 1,
                pageSize: 10,
                author: 'leve'
            },
            blogList: []
        }
    },
    async created() {
        const { data: res } = await this.$http.get('/blog/list', this.form)
        this.blogList = res.data
    },
    props: ['showPanel', 'categories', 'date'],
    watch: {
        showPanel: function(newVal, oldVal) {
            this.showPanel = newVal
        },
        categories: function(newVal, oldVal) {
            this.categories = newVal
        },
        date: function(newVal, oldVal) {
            this.date = newVal
        }
    },
    methods: {
        onSubmit() {
            this.getList()
        },
        onRead(article) {
            this.$emit('read', article)
        },
        onUpdate(article) {
            this.$emit('update',article)
        },
        async onDelete(id) {
            const result = confirm('确定要删除该文章吗')
            if (result) {
                const { data: res } = await this.$http.post('blog/del', { id: id })
                if (res.errno === 0) {
                    this.$message.success('删除成功')
                    const { data: res } = await this.$http.get('/blog/list', this.form)
                    this.blogList = res.data
                }
            }
        },
        async getList() {
            const that = this
            this.$http.get('blog/list', {
                    params: {
                        keyword: this.form.keyword,
                        author: this.form.author,
                        pageNum: this.form.pageNum,
                        pageSize: this.form.pageSize,
                        category: this.form.category,
                        filetime: this.form.filetime
                    }
                })
                .then(function (response) {
                    that.blogList = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
.container{
    margin-top: 20px;
    height: 100%;
}
.content{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 15px;
}
.top{
    height: 32px;
    padding: 20px;
    font-size: 16px;
    line-height: 32px;
    background-color: #F2F5F7;
    text-align: left;
}
.card-item{
    margin-top: 20px;
}
.card-item .item-title{
    font-size: 18px;
    color: #4d4d4d;
    word-wrap: break-word;
    word-break: break-word;
    text-align: start;
}
.card-item .item-edit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
}
.item-edit .edit-time{
    color: #999;
    margin-top: 10px;
}
.edit-control{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.edit-control a{
    color: #409EFF;
    display: inline-block;
    padding:0 15px;
    font-weight: normal;
    border-right: 1px #e9e9e9 solid;
}
.edit-control:last-of-type{
    border: none;
}
</style>
