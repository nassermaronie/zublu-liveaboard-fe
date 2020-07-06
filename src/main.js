import Vue from "vue";
import App from "./App.vue";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

sync(store, router);

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

import VueLodash from "vue-lodash";

Vue.use(VueLodash);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faInfo,
  faExclamationTriangle,
  faAngleUp,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faInfo, faExclamationTriangle, faAngleUp, faTimes);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VueLodash,
  render: h => h(App),

  mounted() {
    //this.$store.dispatch('loadConfig');
  }
}).$mount("#app");
