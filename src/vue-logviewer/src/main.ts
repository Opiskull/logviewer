import Vue from 'vue';
import App from "./App.vue";

import Vuetify from 'vuetify';
import Vuex from 'vuex';

import 'vuetify/dist/vuetify.css'

import './vuetify-fix.css'

Vue.use(Vuetify);
Vue.use(Vuex);



import store from "./app-store";

new Vue({
  el: '#app',
  render: h => h(App),
  store
});

// new Vue({
//   el:'#app',
//   components:{app},
//   template: "<div><app></app></div>"
// })