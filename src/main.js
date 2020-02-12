import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  let uls = []
  blocks.forEach((block)=>{
    let lines = block.innerHTML.toString().split('\n').length - 1
    let ul = document.createElement('ul')
    ul.setAttribute('class','pre-nums')
    for(var i = 1;i <= lines;i++){
      let li = document.createElement('li')
      li.setAttribute('class','numberings')
      let textnode = document.createTextNode(i)
      li.appendChild(textnode)
      ul.appendChild(li)
    }
    uls.push(ul)
    block.setAttribute('class','code')
    hljs.highlightBlock(block)
  })
  let preBlocks = el.querySelectorAll('pre')
      for(var i = 0;i < uls.length;i++){
        preBlocks[i].setAttribute('class','pre')
        preBlocks[i].appendChild(uls[i])
      }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
