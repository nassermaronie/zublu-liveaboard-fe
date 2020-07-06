import Vue from "vue";

var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var rootpath = "https://booking-dev.zubludiving.com";

export default {
  loadConfig({ commit }) {
    var params = {
      resort_id: getParameterByName("resort_id"),
      from_date: getParameterByName("from_date"),
      to_date: getParameterByName("to_date"),
      num_divers: getParameterByName("num_divers"),
      num_non_divers: getParameterByName("num_non_divers"),
      num_courses: getParameterByName("num_courses"),
      num_rooms: getParameterByName("num_rooms")
    };

    var queryString = Object.keys(params)
      .map(key => key + "=" + params[key])
      .join("&");

    Vue.axios
      .get(rootpath + "/api/booking/get_config?" + queryString)
      .then(result => {
        commit("LOAD_CONFIG", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
  },
  saveActivityChoice({ commit }, payload) {
    Vue.axios
      .post(rootpath + "/api/booking/save", payload)
      .then(result => {
        commit("SAVE_ACTIVITY", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
  },
  saveRoomChoice({ commit }, payload) {
    Vue.axios
      .post(rootpath + "/api/booking/save", payload)
      .then(result => {
        commit("SAVE_ROOM", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
  },
  saveTransferChoice({ commit }, payload) {
    Vue.axios
      .post(rootpath + "/api/booking/save", payload)
      .then(result => {
        commit("SAVE_TRANSFER", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
  },
  saveDetail({ commit }, payload) {
    Vue.axios
      .post(rootpath + "/api/booking/save", payload)
      .then(result => {
        commit("SAVE_DETAIL", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
  },
  sendBooking({ commit }, payload) {
    Vue.axios
      .post(rootpath + "/api/booking/submit", payload)
      .then(result => {
        commit("SEND_BOOKING", result.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      });
  },
  updatePricing({ commit }, pricing) {
    () => {
      commit("UPDATE_PRICING", pricing);
    };
  }
};
