import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
import 'mpvue-weui/src/style/weui.css'
import store from './store/index'
import './utils/main.css'
import "./colorui/main.wxss";
import "./colorui/icon.wxss";


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()

import http from './utils/state'
Vue.prototype.$http = http

export default {
}
