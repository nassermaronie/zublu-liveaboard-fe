<template>
  <div
    :class="{
      expanded: expanded,
      'd-none d-lg-block': config.config.stage == 5
    }"
    @click="expanded = true"
  >
    <div class="card details" ref="card" v-if="config.config.stage != 5">
      <div class="card-body">
        <div class="media">
          <div class="resort-thumbnail-wrapper mr-3">
            <div
              class="resort-thumbnail"
              :style="{
                'background-image': 'url(' + config.config.image + ')'
              }"
            ></div>
          </div>
          <div class="media-body">
            <span class="d-none d-md-block text-grey">{{
              config.config.location
            }}</span>
            <h3 class="d-none d-md-block mt-0">{{ config.config.name }}</h3>
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
          <div v-if="!expanded" class="text-right align-items-center d-lg-none">
            <div class="text-grey smaller">
              {{ getGuestText() }}, {{ config.config.num_nights }} nights
            </div>
            <h3 class="d-inline-block">{{ getPrice(config.pricing.total) }}</h3>
            /Total
          </div>
          <a
            href="#"
            v-if="!expanded"
            @click.prevent.stop="expanded = true"
            class="expand-link d-lg-none pl-4"
          >
            <font-awesome-icon icon="angle-up"
          /></a>
          <a
            href="#"
            v-else
            @click.prevent.stop="expanded = false"
            class="close-link d-lg-none"
          >
            <font-awesome-icon icon="times" class="mr-2" />Close</a
          >
        </div>
        <hr />
        <div class="row mb-2">
          <div class="col">
            <div class="d-flex flex-row align-items-center">
              <span class="mr-2" style="width:21px;">
                <img src="../assets/cal.svg" class="d-block" />
              </span>

              <span>{{
                config.config.from_date | date_format(config.config.to_date)
              }}</span>
              <span class="d-inline-block mx-1">
                —
              </span>
              <span>{{ config.config.to_date | date_format }}</span>
              <span class="d-inline-block mx-2">
                •
              </span>

              {{ config.config.num_nights }} nights
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="d-flex flex-row align-items-center">
              <span class="mr-2" style="width:21px;">
                <img src="../assets/people.svg" class="d-block" />
              </span>
              {{ guest_total
              }}<span class="d-inline-block mx-2">
                •
              </span>
              <span>{{ room_total }}</span>
            </div>
          </div>
        </div>
        <hr class="d-lg-none mb-0" />
      </div>
    </div>
    <fixed-header :threshold="500" v-if="config.config.stage != 5">
      <div class="card details" :style="'width:' + width + 'px'">
        <div class="card-body">
          <div v-if="config.pricing.activites.length > 0">
            <h4 class="card-label mb-3">Activities</h4>
            <div
              class="row mt-2"
              v-for="(activity, index) in config.pricing.activites"
              :key="index"
            >
              <div class="col">
                <span>{{ activity.qty }} X {{ activity.title }}</span>
              </div>
              <div class="col-auto">
                {{ getPrice(activity.sub_total) }}
              </div>
            </div>
            <hr />
          </div>
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
                <span v-if="config.config.type == 'package'">Included</span>
                <span v-else>{{ getPrice(room.sub_total, "TBC") }}</span>
              </div>
            </div>
            <hr />
          </div>
          <div v-if="config.pricing.transfers.length > 0">
            <h4 class="card-label mb-3">Transfer</h4>
            <div
              class="row mt-2"
              v-for="(transfer, index) in config.pricing.transfers"
              :key="index"
            >
              <div class="col">
                <span>{{ transfer.qty }} X {{ transfer.title }}</span>
              </div>
              <div class="col-auto">
                {{ getPrice(transfer.sub_total) }}
              </div>
            </div>
            <hr />
          </div>
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
    </fixed-header>
    <div v-if="notification" class="mt-4">
      <div
        :class="notification.type + ' card notification'"
        v-for="notification in config.config.notifications.data"
        :key="notification.id"
      >
        <div class="card-body" v-html="notification.title"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FixedHeader from "vue-fixed-header";

export default {
  name: "Sidebar",
  components: {
    FixedHeader
  },
  props: {
    msg: String,
    notification: Boolean
  },
  data() {
    return {
      expanded: false,
      width: 0
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    room_total() {
      return parseInt(this.config.config.num_rooms) > 1
        ? this.config.config.num_rooms + " rooms"
        : this.config.config.num_rooms + " room";
    },
    guest_total() {
      return this.config.config.guest_num > 1
        ? this.config.config.guest_num + " guests"
        : this.config.config.guest_num + " guest";
    },
    guest_details() {
      if (!this.config) return "";
      var output = [];
      var num_divers = this.config.config.num_divers;
      var num_courses = this.config.config.num_courses;
      var num_non_divers = this.config.config.num_non_divers;

      if (num_divers > 0) {
        output.push(num_divers + " " + (num_divers > 1 ? "divers" : "diver"));
      }
      if (num_courses > 0) {
        output.push(
          num_courses + " " + (num_courses > 1 ? "courses" : "course")
        );
      }
      if (num_non_divers > 0) {
        output.push(
          num_non_divers +
            " " +
            (num_non_divers > 1 ? "non-divers" : "non-diver")
        );
      }

      return output.join(", ");
    }
  },
  filters: {
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
    this.cardWidth();
    window.addEventListener("resize", this.cardWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.cardWidth);
  },
  methods: {
    cardWidth() {
      this.width = this.$refs.card.clientWidth;
    },
    getGuestText() {
      return (
        this.config.config.guest_num +
        " guest" +
        (this.config.config.guest_num > 1 ? "s" : "")
      );
    },
    getPrice(value, zeroText) {
      if (value == 0) {
        if (typeof zeroText != "undefined") return zeroText;

        return "Free";
      } else
        return (
          this.config.config.currency +
          " " +
          value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
    }
  }
};
</script>
<style>
@media screen and (min-width: 769px) {
  .vue-fixed-header--isFixed {
    position: fixed;
    top: 0;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin-top: 0.5rem;
}
#app .app-main h4.card-label {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.resort-thumbnail {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center center;
}

@media screen and (max-width: 991px) {
  .card.details:first-child {
    .card-body {
      padding: 0;
      .media {
        padding: 0 1.25rem;
        height: 80px;
        align-items: center;
        .resort-thumbnail {
          width: 48px;
          height: 48px;
        }
        + hr {
          visibility: hidden;
        }
      }
    }
  }
  .expand-link {
    color: #727272 !important;
    font-size: 1.5rem;
  }
  .sidebar > div {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 80px;
    left: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    background-color: #fff;
    transition: all 0.5s;
    z-index: 20;
    h3 {
      margin: 0;
      line-height: 1em;
    }
    .close-link {
      display: none;
    }
    &.expanded {
      top: 0;
      height: 100vh;
      padding-bottom: 100px;
      overflow-y: scroll;
      .media {
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      }
      .close-link {
        display: block;
        font-weight: 500;
      }
    }
    .card.details {
      border: none;
      + .card.details {
        margin-top: 0 !important;
      }
    }
    .row,
    .notification,
    hr {
      max-width: 100%;
      width: 450px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

@media screen and (max-width: 576px) {
  .activity-item .card {
    border: none;
    .card-body {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .activity-item + .activity-item .card {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }
}
</style>
