<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <h1>How do you want to get there?</h1>

        <div
          :class="
            notification.type + ' card notification stage-notification mb-3'
          "
          v-for="notification in stage_notifications"
          :key="notification.id"
        >
          <div class="card-body d-flex align-items-start">
            <img
              src="../assets/info.svg"
              class="d-block mr-2"
              v-if="notification.type == 'info'"
            />
            <div v-html="notification.title"></div>
          </div>
        </div>

        <div
          class="card-option mb-4"
          v-bind:class="{ selected: form_data[transfer.id] }"
          v-for="transfer in config.config.transfers.data"
          v-bind:key="transfer.id"
        >
          <h3>
            <span class="align-middle">{{ transfer.title }}</span>
            <img
              src="../assets/selected.png"
              alt=""
              class="selected ml-2 align-middle"
              v-if="form_data[transfer.id]"
            />
          </h3>
          <div>
            {{ transfer.transfer_description }}
          </div>
          <div
            class="d-flex justify-content-between align-items-middle mt-4"
            v-if="
              !transfer.mandatory || config.config.transfers.data.length > 1
            "
          >
            <button
              class="button button-sm "
              v-if="form_data[transfer.id] == 1 && !transfer.mandatory"
              @click="removeTransfer(transfer.id)"
            >
              Remove transfer
            </button>
            <button
              class="button button-teal-outline button-sm "
              v-else-if="!form_data[transfer.id]"
              @click="addTransfer(transfer.id)"
            >
              Add transfer
            </button>
            <span class="complimentary" v-else>
              <span v-if="transfer.price > 0">Mandatory</span
              ><span v-else>Complimentary</span>
            </span>
            <div class="text-right col">
              <div class="guest_num">
                {{ getPeopleText(transfer.guest_num) }}
              </div>
              <span class="price">
                {{ getPrice(transfer.price) }}
              </span>
            </div>
          </div>
          <div
            class="d-flex justify-content-between align-items-end mt-4"
            v-else
          >
            <span class="complimentary">
              <span v-if="transfer.price > 0">Mandatory</span
              ><span v-else>Complimentary</span>
            </span>

            <div class="text-right col">
              <div class="guest_num">
                {{ getPeopleText(transfer.guest_num) }}
              </div>
              <span class="price">
                {{ getPrice(transfer.price) }}
              </span>
            </div>
          </div>
        </div>

        <ErrorMsg :error="error"></ErrorMsg>
        <button
          @click="saveStep(true)"
          :disabled="error"
          class="button button-teal mt-4"
        >
          Continue
        </button>
        <hr class="my-6" />
        <h2>Not sure what to choose?</h2>
        <a href="#" class="button">Get in touch</a>
      </div>
      <div class="col-lg-4 sidebar">
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$teal: #1695a3;

h1 {
  margin-bottom: 0.8em !important;
}
label {
  font-size: 20px;
  line-height: 30px;
}

.guest_num {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  color: #727272;
}
.checkbox-custom {
  height: 24px;
  display: block;
  position: relative;
  margin-right: 1em;
  .box {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    background: #fff;
    color: #fff;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    border: 1.5px solid #727272;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
      -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    display: flex;
    justify-content: center;
    align-items: center;
    .fa-check {
      font-size: smaller;
    }
  }
  input {
    display: none;
  }
  input:checked + .box {
    background: $teal;
    border-color: $teal;
  }
}
.complimentary {
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
}
</style>
<script>
import { mapActions } from "vuex";
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import _ from "lodash";

import ErrorMsg from "@/components/ErrorMsg.vue";

export default {
  name: "transfers",
  components: {
    Sidebar,
    ErrorMsg
  },
  data() {
    return {
      form_data: {},
      error_msg: null,
      stage_notifications: []
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    error() {
      if (!this.$store) return null;
      return this.$store.state.error;
    }
  },
  mounted() {
    this.form_data = this.config.config.form_data.transfers;
    this.stage_notifications = _.filter(
      this.config.config.stage_notifications.data,
      { stage: "transfer" }
    );
    this.$nextTick(() => {
      // element which needs to be scrolled to
      var element = document.getElementById("app");
      // scroll to element
      element.scrollIntoView();
    });
  },
  filters: {},
  watch: {
    // form_data:{
    //   deep: true,
    //   handler()
    //   {
    //     this.saveStep();
    //   }
    // }
  },
  methods: {
    ...mapActions(["saveTransferChoice"]),
    getPeopleText(num) {
      return num > 1 ? num + " people" : num + " person";
    },
    removeTransfer(id) {
      var temp = _.clone(this.form_data);
      delete temp[id];
      this.form_data = temp;

      this.saveStep();
    },
    addTransfer(id) {
      this.form_data = {};
      this.form_data[id] = 1;
      this.saveStep();
    },
    saveStep(next) {
      var payload = this.config.config;
      payload.form_data.transfers = this.form_data;
      if (typeof next != "undefined") payload.stage = 4;
      else payload.stage = 3;

      this.saveTransferChoice({ config: payload });
    },
    getPrice(value) {
      if (value == 0) return "Free";
      else
        return (
          this.config.config.currency +
          " " +
          value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
    }
  }
};
</script>
