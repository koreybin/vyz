import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import api from "./interface/index"
import bus from "@/utils/eventBus"
import qs from 'qs'
// import print from '@/utils/print'
import print from '@/utils/printother'
import store from './store'
// import VueResource from 'vue-resource';
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data
import request from './utils/request'
import * as filters from './filters' // global filters
//富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import App from './App'
import router from './router'
import './styles/reset.css'
import numeral from 'numeral'
import PrintOther from 'vue-print-nb'
import JsonExcel from 'vue-json-excel'



Vue.use(VueQuillEditor)
Vue.use(print)
Vue.use(PrintOther)
//  Vue.use(VueResource)
Vue.prototype.$qs = qs
Vue.prototype.$api = api.commonUrl
Vue.prototype.$numeral = numeral
// Vue.prototype.$bus = bus


Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.directive("focus", {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
})
Vue.component('downloadExcel', JsonExcel)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 挂载全局
// axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
Vue.prototype.$http = request // ajax请求方法
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  template: '<App/>',
  components: { App }
})
