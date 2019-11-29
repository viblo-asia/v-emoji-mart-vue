import Vue from 'vue'
import App from './app'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    lazyComponent: true,
})

new Vue({
    el: '#app',
    render: h => h(App)
})
