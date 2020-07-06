import Vue from "vue";
import Vuex from "vuex";
// import VuexPersist from 'vuex-persist'
import countryCodes from "./countrycode";
import { mutations } from "./mutations";
import actions from "./actions";
import plugins from "./plugins";

// const vuexPersist = new VuexPersist({
//   key: 'zublu-booking',
//   storage: window.localStorage
// })

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countryCodes: countryCodes,
    config: null,
    error: null,
    form_data: null
    //data: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins
});
