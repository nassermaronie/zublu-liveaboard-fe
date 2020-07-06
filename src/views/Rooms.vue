<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <h1>Where do you want to stay?</h1>
        <span class="subheading"
          >Select rooms which best fit your needs for this trip.</span
        >

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
        <div v-for="room in config.config.rooms.data" :key="room.id">
          <div
            class="card room mb-3"
            v-bind:class="{
              selected: form_data[room.id && config.config.type == 'package']
            }"
          >
            <div class="row no-gutters">
              <div class="col-md-5 col-lg-5 room-image">
                <VueSlickCarousel
                  :arrows="true"
                  :dots="true"
                  v-if="room.images.length > 1"
                >
                  <img
                    :src="img"
                    class="img-fluid "
                    v-for="(img, key) in room.images"
                    :key="key"
                  />
                </VueSlickCarousel>
                <img
                  :src="room.images[0]"
                  class="img-fluid "
                  v-else-if="room.images.length == 1"
                  style="width:100%;height:100%;object-fit:cover;"
                />
              </div>
              <div class="col-md-7 col-lg-7">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h3>{{ room.title }}</h3>
                      <p>{{ room.sub_title }}</p>
                    </div>
                    <div
                      class="col-6 text-right"
                      v-if="form_data && !allowRoomQty"
                    >
                      <label class="radio">
                        <input
                          type="radio"
                          name="room_type"
                          @click="changeRoomType(room.id)"
                          :checked="form_data[room.id]"
                        />
                        <span>
                          <span></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <span class="d-block text-grey">{{
                    room.inclusion_text | ellipsis
                  }}</span>
                  <a
                    :href="'#modal_' + room.id"
                    data-toggle="modal"
                    v-if="room.inclusions.data.length"
                    ><strong>See all included</strong></a
                  >

                  <div
                    class="modal"
                    tabindex="-1"
                    role="dialog"
                    :id="'modal_' + room.id"
                  >
                    <div class="modal-dialog" role="document">
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
                          <div>
                            <h2 class="mt-2 mb-4">What can you expect?</h2>
                            <h3>Included</h3>
                            <table class="table borderless">
                              <tr
                                v-for="inclusion in filterInclusionType(
                                  room.inclusions.data,
                                  'included'
                                )"
                                :key="room.id + '-' + inclusion.id"
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
                                room.inclusions.data,
                                'not_included'
                              ).length
                            "
                          >
                            <hr />
                            <h3>Not Included</h3>
                            <table class="table borderless">
                              <tr
                                v-for="inclusion in filterInclusionType(
                                  room.inclusions.data,
                                  'not_included'
                                )"
                                :key="room.id + '-' + inclusion.id"
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
                              filterInclusionType(room.inclusions.data, 'extra')
                                .length
                            "
                          >
                            <hr />
                            <h3>Available at resort</h3>
                            <table class="table borderless">
                              <tr
                                v-for="inclusion in filterInclusionType(
                                  room.inclusions.data,
                                  'extra'
                                )"
                                :key="room.id + '-' + inclusion.id"
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
                    <div class="col-6" v-if="form_data && allowRoomQty">
                      <numeral-stepper
                        size="regular"
                        :setvalue="form_data[room.id]"
                        @updateStepperVal="updateRoomQuantity($event, room.id)"
                      ></numeral-stepper>
                    </div>
                    <div class="col text-right align-items-center">
                      <div class="text-grey smaller">
                        <h4 class="d-inline-block">
                          {{ getPrice(room.price_sub_total, "TBC") }}
                        </h4>
                        /total
                      </div>
                      <h4 class="d-inline-block">
                        {{ getPrice(room.price_per_night, "TBC") }}
                      </h4>
                      /night
                      <div v-if="config.config.type == 'package'">
                        <a
                          @click="toggleDetails(room.id)"
                          v-if="!show_details[room.id]"
                          >Show details
                          <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 0L0 6L1.415 7.415L6 2.83L10.585 7.415L12 6L6 0Z"
                              fill="#1695A3"
                            />
                          </svg>
                        </a>
                        <a @click="toggleDetails(room.id)" v-else
                          >Hide details
                          <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 0L0 6L1.415 7.415L6 2.83L10.585 7.415L12 6L6 0Z"
                              fill="#1695A3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <table
                    class="table mt-4"
                    v-if="
                      show_details[room.id] && config.config.type == 'package'
                    "
                  >
                    <thead>
                      <tr>
                        <th>Guest type</th>
                        <th class="text-right">Per day</th>
                        <th class="text-right">Per package</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(package_row, index) in config.pricing
                          .package_rows[room.id]"
                        :key="index"
                      >
                        <td>{{ package_row.title }}</td>
                        <td class="text-right">{{ package_row.per_day }}</td>
                        <td class="text-right">
                          {{ package_row.per_package }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
.room-image {
  background-size: cover;
  background-position: center center;
}

.card {
  &.selected {
    border-color: #1695a3;
  }

  table {
    thead th {
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      color: #727272;
      padding-top: 24px;
      padding-bottom: 4px;
      border-bottom: none;
    }

    tbody {
      td {
        border: none;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        padding-top: 4px;
        padding-bottom: 4px;
        /* identical to box height, or 150% */

        color: #000000;
      }
    }
  }
}

.radio {
  input {
    position: absolute;
    cursor: pointer;
    height: 0;
    width: 0;
    left: -2000px;

    & + span {
      border: 1px #727272 solid;
      width: 20px;
      height: 20px;
      border-radius: 90px;
      display: flex;
      border-radius: 90px;
      cursor: pointer;
      text-align: center;
      align-items: center;
      justify-content: center;

      span {
        width: 12px;
        height: 12px;
        display: inline-block;
        border-radius: 90px;
      }
    }

    &:checked + span {
      border: 1px #1695a3 solid;

      > span {
        background: #1695a3;
      }
    }
  }
}
</style>
<script>
import { mapActions } from "vuex";
// @ is an alias to /src
import _ from "lodash";
import Sidebar from "@/components/Sidebar.vue";
import NumeralStepper from "@/components/NumeralStepper.vue";
import ErrorMsg from "@/components/ErrorMsg.vue";
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "rooms",
  components: {
    Sidebar,
    NumeralStepper,
    ErrorMsg,
    VueSlickCarousel
  },
  data() {
    return {
      form_data: {},
      error_msg: null,
      stage_notifications: [],
      allowRoomQty: false,
      show_details: {}
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
  filters: {
    ellipsis(value) {
      if (value.length > 45 || value) {
        return value.substring(0, 45) + "...";
      }

      return value;
    }
  },
  mounted() {
    this.form_data = this.config.config.form_data.rooms;
    this.stage_notifications = _.filter(
      this.config.config.stage_notifications.data,
      { stage: "room" }
    );
    this.allowRoomQty = this.config.config.type == "custom" ? true : false;
    this.show_details = _.chain(this.config.config.rooms.data)
      .keyBy("id")
      .mapValues(function() {
        return false;
      })
      .value();

    var checklTbc = false;

    _.each(this.config.config.rooms.data, function(o) {
      if (o.price_per_night == 0) checklTbc = true;
    });

    if (checklTbc) {
      this.stage_notifications.push({
        type: "info",
        title:
          "<p>The room prices for your date range have not yet been released.  Please continue with your booking. We will confirm the prices for your dates shortly and we will update you accordingly.</p>"
      });
    }

    this.$nextTick(() => {
      // element which needs to be scrolled to
      var element = document.getElementById("app");
      // scroll to element
      element.scrollIntoView();
    });
  },
  methods: {
    ...mapActions(["saveRoomChoice"]),
    changeRoomType(roomId) {
      this.form_data = {};
      this.form_data[roomId] = this.config.config.num_rooms;
      this.saveStep(null, true);
    },
    updateRoomQuantity(qty, roomId) {
      this.form_data[roomId] = qty;

      this.saveStep(null, true);
    },
    saveStep(next, bypasscheck) {
      var payload = this.config.config;
      payload.form_data.rooms = this.form_data;
      if (typeof next != "undefined" && next) payload.stage = 3;
      else payload.stage = 2;

      if (typeof bypasscheck != "undefined") payload.bypasscheck = true;

      this.saveRoomChoice({ config: payload });
    },
    filterInclusionType(inclusions, type) {
      return _.filter(inclusions, function(o) {
        return o.type == type;
      });
    },
    toggleDetails(roomId) {
      this.show_details[roomId] = !this.show_details[roomId];
    },
    getPrice(value, zeroText) {
      if (typeof zeroText == "undefined") zeroText = "Free";

      if (value == 0) return zeroText;
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
