<template>
  <div class="container" v-if="config">
    <div class="row">
      <div class="col-lg-8">
        <h1>What do you want to do?</h1>
        <span class="subheading"
          >Select the appropriate activity for each guest joining this
          trip.</span
        >

        <div
          :class="notification.type + ' card notification stage-notification'"
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
          v-for="activityCategory in config.config.activities"
          :key="activityCategory.id"
        >
          <h2>{{ activityCategory.name }}</h2>
          <div class="row">
            <div
              class="col-md-6 activity-item mb-4"
              v-for="activity in activityCategory.activities"
              :key="activity.id"
            >
              <div class="card h-100 ">
                <div class="card-body">
                  <h3>{{ activity.title }}</h3>
                  <p>{{ activity.sub_title }}</p>
                  <span class="text-grey d-block">{{
                    activity.inclusion_text | ellipsis
                  }}</span>
                  <a
                    :href="'#modal_' + activity.id"
                    data-toggle="modal"
                    v-if="activity.inclusions.data.length"
                    ><strong>See all included</strong></a
                  >

                  <div
                    class="modal"
                    tabindex="-1"
                    role="dialog"
                    :id="'modal_' + activity.id"
                  >
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body">
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.63601 18.3639C5.44075 18.1686 5.44075 17.852 5.63601 17.6568L17.6568 5.63595C17.8521 5.44069 18.1687 5.44069 18.3639 5.63595C18.5592 5.83121 18.5592 6.14779 18.3639 6.34305L6.34312 18.3639C6.14785 18.5591 5.83127 18.5591 5.63601 18.3639Z"
                                fill="#222222"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18.3639 18.3639C18.1687 18.5591 17.8521 18.5591 17.6568 18.3639L5.63601 6.34306C5.44075 6.14779 5.44075 5.83121 5.63601 5.63595C5.83127 5.44069 6.14785 5.44069 6.34312 5.63595L18.3639 17.6568C18.5592 17.852 18.5592 18.1686 18.3639 18.3639Z"
                                fill="#222222"
                              />
                            </svg>
                          </button>
                          <div class="px-2">
                            <h2 class="mt-2 mb-4">What can you expect?</h2>
                            <h3>Included</h3>
                            <table class="table borderless">
                              <tr
                                v-for="inclusion in filterInclusionType(
                                  activity.inclusions.data,
                                  'included'
                                )"
                                :key="activity.id + '-' + inclusion.id"
                              >
                                <td width="50">
                                  <img
                                    :src="inclusion.icon"
                                    class="img-fluid"
                                  />
                                </td>
                                <td>{{ inclusion.name }}</td>
                              </tr>
                            </table>
                          </div>
                          <div
                            v-if="
                              filterInclusionType(
                                activity.inclusions.data,
                                'not_included'
                              ).length
                            "
                            class="px-2"
                          >
                            <hr />
                            <h3>Not Included</h3>
                            <table class="table borderless">
                              <tr
                                v-for="inclusion in filterInclusionType(
                                  activity.inclusions.data,
                                  'not_included'
                                )"
                                :key="activity.id + '-' + inclusion.id"
                              >
                                <td width="50">
                                  <img
                                    :src="inclusion.icon"
                                    class="img-fluid"
                                  />
                                </td>
                                <td>{{ inclusion.name }}</td>
                              </tr>
                            </table>
                          </div>
                          <div
                            v-if="
                              filterInclusionType(
                                activity.inclusions.data,
                                'extra'
                              ).length
                            "
                            class="px-2"
                          >
                            <hr />
                            <h3>Available at resort</h3>
                            <table class="table borderless">
                              <tr
                                v-for="inclusion in filterInclusionType(
                                  activity.inclusions.data,
                                  'extra'
                                )"
                                :key="activity.id + '-' + inclusion.id"
                              >
                                <td width="50">
                                  <img
                                    :src="inclusion.icon"
                                    class="img-fluid"
                                  />
                                </td>
                                <td>{{ inclusion.name }}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-6" v-if="form_data">
                      <numeral-stepper
                        size="regular"
                        :setvalue="form_data[activity.id]"
                        @updateStepperVal="
                          updateActivityQuantity($event, activity.id)
                        "
                      ></numeral-stepper>
                    </div>
                    <div
                      class="col-6 text-right align-items-center"
                      v-if="activity.price > 0"
                    >
                      <h4 class="d-inline-block">
                        {{ getPrice(activity.price) }}
                      </h4>
                      /person
                    </div>
                    <div class="col-6 text-right align-items-center" v-else>
                      <h4>Free</h4>
                    </div>
                  </div>
                </div>
              </div>
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

<style scoped lang="scss">
.modal-content {
  p {
    margin-bottom: 0;
  }
  a {
    font-weight: 500;
  }
}
// .modal-dialog
// {
// 	border-radius:0;
// }
.modal-footer {
  border-top: none;
}
.borderless td {
  border: none;
}
</style>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import NumeralStepper from "@/components/NumeralStepper.vue";
import _ from "lodash";
import { mapActions, mapState } from "vuex";
import ErrorMsg from "@/components/ErrorMsg.vue";

export default {
  name: "activities",
  components: {
    Sidebar,
    NumeralStepper,
    ErrorMsg
  },
  data() {
    return {
      form_data: null,
      stage_notifications: []
    };
  },
  computed: mapState(["config", "error"]),

  watch: {
    config() {
      if (!this.form_data) {
        this.init();
      }
    }
  },
  mounted() {
    if (this.config) {
      this.init();
    }
  },
  filters: {
    ellipsis(value) {
      if (value && value.length > 35) {
        return value.substring(0, 35) + "...";
      }

      return value;
    }
  },
  methods: {
    ...mapActions(["saveActivityChoice"]),
    init() {
      this.form_data = this.config.config.form_data.activities;
      this.stage_notifications = _.filter(
        this.config.config.stage_notifications.data,
        { stage: "activity" }
      );
    },
    saveStep(next, bypasscheck) {
      var payload = this.config.config;
      payload.form_data.activities = this.form_data;
      if (typeof next != "undefined" && next) payload.stage = 2;
      else payload.stage = 1;

      if (typeof bypasscheck != "undefined") payload.bypasscheck = true;

      this.saveActivityChoice({ config: payload });
    },
    updateActivityQuantity(qty, activityId) {
      this.form_data[activityId] = qty;

      this.saveStep(null, true);
    },
    updateBookingInfo(val) {
      this.$store.dispatch("updatePricing", val);
    },
    filterInclusionType(inclusions, type) {
      return _.filter(inclusions, function(o) {
        return o.type == type;
      });
    },
    getPrice(value) {
      if (value == 0) return "Free";
      else
        return (
          this.config.config.currency +
          " " +
          value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
    },
    getUnit(type) {
      switch (type) {
        case "diver":
          return "bundle";
        case "course":
          return "course";
      }

      return "";
    }
  }
};
</script>
