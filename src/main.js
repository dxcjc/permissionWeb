import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import { getBtnInfo } from "@/api/operation";
import { getToken } from "@/utils/auth";
const jwt = require('jsonwebtoken');
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

Vue.directive('auth', {
    // 当被绑定的元素插入到 DOM 中时……
    bind: async function(el, binding) {
        let btnDesc = binding.value
            //从token中拿roles更新不及时，要刷新才跟新roles
        getToken()
        let roles = jwt.verify(getToken(), 'secret12345').roles
            // let roles = this.$store.state.roles
        let { data } = await getBtnInfo({ desc: btnDesc, roles })
        if (!data) {
            el.parentNode && el.parentNode.removeChild(el)
        }

    }
})

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
    // Vue.directive("permission",(el,bind)=>{
    //
    //
    // })
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})