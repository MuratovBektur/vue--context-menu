import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import "./assets/fonts/Roboto/stylesheet.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
