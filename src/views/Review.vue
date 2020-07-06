<template>
  <div class="container review">
    <div class="row">
      <div class="col-lg-8">
        <h1>Does everything look good?</h1>

        <div class="row">
          <div class="col-lg-9">
            <div class="media mb-30">
              <div class="resort-thumbnail-wrapper mr-3">
                <div
                  class="resort-thumbnail"
                  :style="{
                    'background-image': 'url(' + config.config.image + ')'
                  }"
                ></div>
              </div>
              <div class="media-body">
                <span class="d-block text-grey">{{
                  config.config.location
                }}</span>
                <h3 class="mt-0">{{ config.config.name }}</h3>
                <div class="d-none d-lg-block">
                  <div
                    class="facility-icon"
                    v-for="facility in config.config.facilites.data"
                    :key="facility.id"
                  >
                    <img :src="facility.icon" width="20" />
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-30">
              <h4 class="mb-3">Enquiry summary</h4>

              <div class="row justify-content-between my-2">
                <div class="col">
                  <div class="d-flex flex-row align-items-center ">
                    <span class="mr-2" style="width:21px;">
                      <img src="../assets/cal.svg" class="d-block" />
                    </span>

                    <span>{{
                      config.config.from_date
                        | date_format(config.config.to_date)
                    }}</span>
                    <span class="d-inline-block mx-1">
                      —
                    </span>
                    <span>{{ config.config.to_date | date_format }}</span>
                  </div>
                </div>
                <div class="col-auto col-md text-right">
                  {{ config.config.num_nights }} nights
                </div>
              </div>

              <div class="row justify-content-between my-2">
                <div class="col">
                  <div class="d-flex flex-row align-items-center ">
                    <span class="mr-2" style="width:21px;">
                      <img src="../assets/people.svg" class="d-block" />
                    </span>

                    {{ guest_total }}
                  </div>
                </div>
                <div class="col-auto col-md text-right">
                  {{ room_total }}
                </div>
              </div>
            </div>
            <div class="mb-30">
              <h4 class="mb-3">Guest Details</h4>

              <div
                class="d-flex flex-row align-items-center justify-content-between my-2"
              >
                <span>Name</span>
                <span>{{ fullname }}</span>
              </div>

              <div
                class="d-flex flex-row align-items-center justify-content-between my-2"
              >
                <span>Email</span>
                <span>{{ config.config.form_data.email }}</span>
              </div>
            </div>

            <div class="mb-30">
              <div>
                <div v-if="config.pricing.activites.length > 0">
                  <h4 class="card-label mb-3">Activities</h4>
                  <div
                    class="row mt-2"
                    v-for="(activity, index) in config.pricing.activites"
                    :key="index"
                  >
                    <div class="col">
                      <span
                        >{{ activity.qty }} X {{ activity.title }}
                        <span
                          v-if="activity.sub_title && activity.sub_title != ''"
                          >({{ activity.sub_title }})</span
                        >
                      </span>
                    </div>
                    <div class="col-auto">
                      {{ getPrice(activity.sub_total) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-30">
              <div>
                <div v-if="config.pricing.rooms.length > 0">
                  <h4 class="card-label mb-3">Rooms</h4>
                  <div
                    class="row mt-2"
                    v-for="(room, index) in config.pricing.rooms"
                    :key="index"
                  >
                    <div class="col">
                      <span>{{ room.qty }} X {{ room.title }}</span>
                    </div>
                    <div class="col-auto">
                      <span v-if="config.config.type == 'package'"
                        >Included</span
                      >
                      <span v-else>{{ getPrice(room.sub_total) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-30">
              <div>
                <div v-if="config.pricing.transfers.length > 0">
                  <h4 class="card-label mb-3">Transfer</h4>
                  <div
                    class="row mt-2"
                    v-for="(transfer, index) in config.pricing.transfers"
                    :key="index"
                  >
                    <div class="col">
                      <span
                        >{{ transfer.qty }} X {{ transfer.title }}
                        <span
                          v-if="transfer.guest_num && transfer.guest_num != ''"
                          >({{ transfer.guest_num | guest_text }})</span
                        ></span
                      >
                    </div>
                    <div class="col-auto">
                      {{ getPrice(transfer.sub_total) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <div>
                <div class="row">
                  <div class="col">
                    <h3>Total ({{ config.config.currency }})</h3>
                  </div>
                  <div class="col-auto">
                    <h3>{{ getPrice(config.pricing.total) }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <label
          class="d-flex align-items-top"
          @click="termCheck = false"
          v-bind:class="{ 'is-invalid': termCheck }"
        >
          <div class="checkbox-custom light terms">
            <input
              type="checkbox"
              name="read_terms"
              value="1"
              v-model="terms"
            />
            <div class="box">
              <font-awesome-icon icon="check" />
            </div>
          </div>
          <span
            >I have read and agree to ZuBlu's
            <a
              href="https://www.zubludiving.com/terms-conditions"
              target="_blank"
              >Terms & Conditions</a
            ></span
          >
        </label>
        <div class="invalid-feedback" v-if="termCheck">
          Please, read and agree to ZuBlu’s terms & conditions to proceed
        </div>

        <div
          class="my-3"
          :class="notification.type + ' card notification'"
          v-for="notification in stage_notifications"
          :key="notification.id"
        >
          <div class="card-body" v-html="notification.title"></div>
        </div>

        <a @click="confirmBooking" class="button button-orange mt-4"
          >Send Booking Enquiry</a
        >
        <div class="info card mt-4 stage-notification">
          <div class="card-body text-blue d-flex flex-row align-items-start">
            <span class="rounded-circle info-icon d-flex mr-2 mt-1"
              ><font-awesome-icon icon="info"
            /></span>
            <span
              >Submitting this form will confirm your reservation, subject to
              availability. Please check your inbox for a confirmation email and
              payment link. If your dates are unavailable, a dive travel expert
              will contact you shortly with alternative dates.</span
            >
          </div>
        </div>

        <div class="d-lg-none">
          <div class="mt-4">
            <div
              :class="notification.type + ' card notification'"
              v-for="notification in config.config.notifications.data"
              :key="notification.id"
            >
              <div class="card-body" v-html="notification.title"></div>
            </div>
          </div>
        </div>

        <hr class="my-6" />
        <h2>Not sure what to choose?</h2>
        <a href="#" class="button">Get in touch</a>
      </div>
      <div class="col-lg-4 sidebar">
        <Sidebar notification="true"></Sidebar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$teal: #1695a3;
$darkGrey: #4c4c4c;
$red: #e12f22;

h1 {
  margin-bottom: 0.8em !important;
}
p {
  font-size: 20px;
  line-height: 34px;
}
a {
  font-weight: 500;
}

label {
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  text-transform: none;
  + .error-text {
    display: none !important;
  }
  &.error + .error-text {
    display: block !important;
    color: $red;
  }
}

#app .app-main .review {
  h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #222222;
  }
}

.input-group-prepend .input-group-text {
  border-right: 0;
}
.checkbox-custom {
  height: 18px;
  display: block;
  position: relative;
  margin-right: 1em;
  .box {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background: #fff;
    color: #fff;
    // font-size: 20px;
    // line-height: 24px;
    text-align: center;
    border: 2px solid #222;
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
    .error & {
      border-color: $red;
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

.mb-30 {
  margin-bottom: 30px;
}

.resort-thumbnail {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center center;
}
</style>

<script>
import moment from "moment";
import _ from "lodash";
import { mapActions } from "vuex";
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "review",
  components: {
    Sidebar
  },
  beforeRouteLeave: function(to, from, next) {
    if (to.name == "thank-you") {
      if (!this.terms) {
        next(false);
        this.validate = true;
        return;
      }
    } else {
      next();
    }
  },
  data() {
    return {
      terms: false,
      validate: false,
      stage_notifications: [],
      termCheck: false
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    fullname() {
      return (
        this.config.config.form_data.first_name +
        " " +
        this.config.config.form_data.last_name
      );
    },
    unreadTerms() {
      return !this.terms;
    },

    room_total() {
      return parseInt(this.config.config.num_rooms) > 1
        ? this.config.config.num_rooms + " rooms"
        : this.config.config.num_rooms + "room";
    },
    guest_total() {
      return this.config.config.guest_num > 1
        ? this.config.config.guest_num + " guests"
        : this.config.config.guest_num + "guest";
    }
  },

  filters: {
    guest_text(value) {
      if (parseInt(value) > 1) {
        return value + " guests";
      } else {
        return value + " guest";
      }
    },
    date_format(value, next_date) {
      if (typeof next_date == "undefined")
        return moment(value, "YYYY-MM-DD").format("MMM D, Y");

      var next = moment(next_date, "YYYY-MM-DD");
      var current = moment(value, "YYYY-MM-DD");
      if (next.format("Y") == current.format("Y"))
        return current.format("MMM D");
      else return current.format("MMM D, Y");
    }
  },

  mounted() {
    this.stage_notifications = _.filter(
      this.config.config.stage_notifications.data,
      { stage: "review" }
    );
    this.$nextTick(() => {
      // element which needs to be scrolled to
      var element = document.getElementById("app");
      // scroll to element
      element.scrollIntoView();
    });
  },
  methods: {
    ...mapActions(["sendBooking"]),
    confirmBooking() {
      if (this.terms) {
        this.termCheck = false;

        var payload = this.config.config;
        payload.stage = 5;

        this.sendBooking({ config: payload });
      } else {
        this.termCheck = true;
      }
    },
    getGuestText() {
      return (
        this.config.config.guest_num +
        " guest" +
        (this.config.config.guest_num > 1 ? "s" : "")
      );
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
