import Vue from 'vue'
import { Button, Container, Main, Aside, Header, Menu, MenuItem, Submenu, Avatar, PageHeader, Input, Select,
     Option, Message, MessageBox, Card, FormItem, Form, Calendar, Dialog } from 'element-ui'


Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(PageHeader)
Vue.use(Input)
Vue.use(Option)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Calendar)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

