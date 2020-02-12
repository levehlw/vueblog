<template>
<el-container  class="home-container">
    <el-container class="top">
        <el-header class="nav">
            <div class="avatar" v-if="isLogged">
                <a href="#"><img src="../assets/avatar.png" alt=""></a>
                <a href="#">{{username}}</a>
                <a href="#" @click="logout">退出</a>
            </div>
            <div class="avatar" v-else>
                <a href="#"><img src="../assets/logout.png" alt=""></a>
                <a href="#" @click="showLoginDialog">登录</a>
                <a href="#">注册</a>
            </div>
            <!-- 顶部导航栏 -->
            <el-menu
  mode="horizontal"
  background-color="#525461"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/" @click="getAll()">全部文章</el-menu-item>
  <el-submenu index="2">
    <template slot="title">分类</template>
    <el-menu-item v-for="item in categories" :key="item.id" :index="item.Name" @click="changeCategory(item.Name)">{{item.Name}}</el-menu-item>
  </el-submenu>
   <el-submenu index="3">
    <template slot="title">归档</template>
    <el-menu-item v-for="item in time" :key="item.filetime" @click="changeTime(item.filetime)">{{item.filetime}}</el-menu-item>
  </el-submenu>
  <el-menu-item index="4">设置</el-menu-item>
  <el-menu-item index="5" @click="toManage()">文章管理</el-menu-item>
  <el-button type="success" @click="toEdit()">写文章</el-button>
</el-menu>
    </el-header>
    <el-main>
        <blog :name="categoryName" ref="blog" :listShow="isList" :blogList="blogList"></blog>
        <Manager @read="read" @update="update" :showPanel="isManage" :categories="categories" :date="time"></Manager>
    </el-main>
    </el-container>
     <el-dialog
        title="用户登录"
        :visible.sync="EditDialogVisible"
        width="50%">
        <!-- 内容主体 -->
         <el-form label-width="80px" ref="loginFormRef" :rules="loginFormRules" class="login_form" :model="loginForm">
                <!-- 用户名 -->
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" label="密码">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns" >
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        <!-- 底部 -->
        <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
            <el-button @click="EditDialogVisible = false">取 消</el-button>
        </span> -->
    </el-dialog>
</el-container>
</template>

<script>
import BlogList from '../components/bloglist/BlogList'
import Manager from '../components/manager/Manager'
export default {
    components: { 'blog': BlogList, 'Manager': Manager },
    inject: ['reload'],
    data() {
        return {
            categories: [],
            categoryName: '',
            time: [],
            isList: true,
            isManage: false,
            page: {
                keyword: '',
                author: 'leve',
                pageNum: 1,
                pageSize: 10,
                category: '',
                filetime: ''
            },
            blogList: [],
            loginForm: {
                username: 'leve',
                password: '123456'
            },
            loginFormRules: {
                username: [
                { required: true, message: '请输入登录名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            // 验证密码是否合法
            password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            },
            EditDialogVisible: false,
            isLogged: false,
            username: ''
        }
    },
    methods: {
        toEdit() {
            const token = window.sessionStorage.getItem('token')
            const role = window.sessionStorage.getItem('amro')
            if(token) {
                if(role === '1'){
                    this.isList = !this.isList
                    this.isManage = !this.isManage
                }
                else return this.$message.error('您还不是管理员')
            }
            else {
                return this.$message.error('您还未登录！')
            }
            this.$router.push('/edit')
        },
        changeCategory(name) {
            if (this.isList) {
                this.page.category = name
                this.getList()
            }
        },
        changeTime(filetime) {
            if (this.isList) {
                this.page.filetime = filetime
                this.getList()
            }
        },
        async getAll() {
            this.isManage = false
            this.isList = true
            const { data: resBlog } = await this.$http.get('/blog/list')
            this.blogList = resBlog.data
        },
        read(article) {
            const token = window.sessionStorage.getItem('token')
            const role = window.sessionStorage.getItem('amro')
            if(token) {
                if(role === '1'){
                    this.isList = !this.isList
                    this.isManage = !this.isManage
                }
                else return this.$message.error('您还不是管理员')
            }
            else {
               return this.$message.error('您还未登录！')
            }
            let array = []
            array.push(article)
            this.blogList = array
        },
        update(article) {
            this.$router.push({path:'/edit', query: {blog:article}})
        },
        async getList() {
            const that = this
            this.$http.get('blog/list', {
                    params: {
                        keyword: this.page.keyword,
                        author: this.page.author,
                        category: this.page.category,
                        filetime: this.page.filetime
                    }
                })
                .then(function (response) {
                    that.blogList = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        toManage() {
            const token = window.sessionStorage.getItem('token')
            const role = window.sessionStorage.getItem('amro')
            if(token) {
                if(role === '1')
                {
                    this.isList = !this.isList
                    this.isManage = !this.isManage
                }
                else return this.$message.error('您还不是管理员')
            }
            else {
                return this.$message.error('您还未登录')
            }
        },
        resetLoginForm () {
            this.$refs.loginFormRef.resetFields()
        },
        login() {
        this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post('user/login', this.loginForm)
                if(res.errno !== 0) {
                    return this.$message.error('登陆失败')
                }
                this.$message.success('登陆成功')
                window.sessionStorage.setItem('token', res.data.token)
                window.sessionStorage.setItem('amro', res.data.role)
                this.isLogged = true
                this.username = res.data.username
                this.EditDialogVisible = false
                this.reload()
            })
        },
        logout() {
            window.sessionStorage.clear()
            this.reload()
        },
        showLoginDialog() {
            this.EditDialogVisible = true
        }
    },
    async created() {
        const token = window.sessionStorage.getItem('token')
        if(token)
        {
            this.isLogged = true
        }
        const { data: res } = await this.$http.get('blog/category')
        this.categories = res.data
        const { data: timeList } = await this.$http.get('blog/time')
        this.time = timeList.data
        const { data: resBlog } = await this.$http.get('/blog/list', this.page)
        this.blogList = resBlog.data
    }
}
</script>

<style scoped>
  .home-container{
      height: 100%;
  }
  .nav {
    background-color: #525461;
    color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    padding: 0 260px !important;
  }
  .nav .avatar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
  }
  .avatar img{
      width: 45px;
      height: 45px;
      border-radius: 50%;
  }
  .avatar span{
      margin-left: 5px;
  }
  .el-menu{
      font-size: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: none;
  }
  .el-main {
    padding: 0;
    margin: 0;
    text-align: center;
    min-height: 1000px;
    background-color: #eaeaea;
  }
  .el-button{
      margin-left: 20px;
  }
  .avatar a{
      text-decoration: none;
      color: #fff;
      font-size: 16px;
      margin-left: 10px;
  }
  .avatar a:first-of-type{
      margin-left: 0;
  }
</style>
