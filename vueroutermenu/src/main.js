import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import routes from '../src/routes'
import {Vuelidate} from 'vuelidate';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
const router = new VueRouter({routes});
new Vue({
    render: h => h(App),
    router,
}).$mount('#app');