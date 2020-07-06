import router from "@/router";

export const STORAGE_KEY = "zulbu";

// for testing
if (navigator.userAgent.indexOf("PhantomJS") > -1) {
  window.localStorage.clear();
}

export const mutations = {
  LOAD_CONFIG(state, config) {
    state.config = config;
  },

  SAVE_ACTIVITY(state, config) {
    if (config.error) {
      state.error = config.msg;
    } else {
      state.error = null;
      state.config = config;
      if (state.config.config.stage > 1) {
        router.push({ name: "rooms", query: { ...state.route.query } });
      }
    }
  },

  SAVE_ROOM(state, config) {
    if (config.error) {
      state.error = config.msg;
    } else {
      state.error = null;
      state.config = config;
      if (state.config.config.stage > 2) {
        router.push({ name: "transfers", query: { ...state.route.query } });
      }
    }
  },

  SAVE_TRANSFER(state, config) {
    if (config.error) {
      state.error = config.msg;
    } else {
      state.error = null;
      state.config = config;

      if (state.config.config.stage > 3) {
        router.push({ name: "zublu-details", query: { ...state.route.query } });
      }
    }
  },

  SAVE_DETAIL(state, config) {
    if (config.error) {
      state.error = config.msg;
    } else {
      state.error = null;
      state.config = config;

      if (state.config.config.stage > 4) {
        router.push({ name: "review", query: { ...state.route.query } });
      }
    }
  },

  SEND_BOOKING(state, config) {
    if (config.error) {
      state.error = config.msg;
    } else {
      state.error = null;
      state.config = config;
      router.push({ name: "thankyou", query: { ...state.route.query } });
    }
  }
};
