import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$api = "https://why.ppcdeveloper.com/api";
Vue.prototype.$baseUrl = "http://127.0.0.1:8000/public";
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
