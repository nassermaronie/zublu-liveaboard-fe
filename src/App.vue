<template>
  <div id="app">
    <div class="app-main mb-5 pb-5">
      <header class=" py-3 mb-sm-5 mb-3">
        <div class="container">
          <div class="row">
            <div class="col-3 col-lg-1">
              <a href="https://www.zubludiving.com/"
                ><img
                  src="https://www.zubludiving.com/css/img/logo-blue.svg"
                  alt=""
                  class="logo"
              /></a>
            </div>
            <div
              class="col-12 d-sm-none d-flex justify-content-between align-items-center mt-5 breadcrumbs-mobile"
              v-if="!hideBreadcrumbs"
            >
              <div>
                <router-link
                  :to="{ path: 'activities', query: $route.query }"
                  class="active"
                  v-if="step == 2"
                  ><svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.25017 8.70711C0.859645 8.31658 0.859644 7.68342 1.25017 7.29289L8.39662 0.146446C8.59188 -0.0488155 8.90847 -0.0488155 9.10373 0.146446C9.29899 0.341709 9.29899 0.658291 9.10373 0.853554L1.95728 8L9.10373 15.1464C9.29899 15.3417 9.29899 15.6583 9.10373 15.8536C8.90847 16.0488 8.59188 16.0488 8.39662 15.8536L1.25017 8.70711Z"
                      fill="#1695A3"
                    />
                  </svg>
                  Activities</router-link
                >
                <router-link
                  :to="{ path: 'rooms', query: $route.query }"
                  class="active"
                  v-if="step == 3"
                  ><svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.25017 8.70711C0.859645 8.31658 0.859644 7.68342 1.25017 7.29289L8.39662 0.146446C8.59188 -0.0488155 8.90847 -0.0488155 9.10373 0.146446C9.29899 0.341709 9.29899 0.658291 9.10373 0.853554L1.95728 8L9.10373 15.1464C9.29899 15.3417 9.29899 15.6583 9.10373 15.8536C8.90847 16.0488 8.59188 16.0488 8.39662 15.8536L1.25017 8.70711Z"
                      fill="#1695A3"
                    />
                  </svg>
                  Rooms</router-link
                >
                <router-link
                  :to="{ path: 'transfers', query: $route.query }"
                  class="active"
                  v-if="step == 4"
                  ><svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.25017 8.70711C0.859645 8.31658 0.859644 7.68342 1.25017 7.29289L8.39662 0.146446C8.59188 -0.0488155 8.90847 -0.0488155 9.10373 0.146446C9.29899 0.341709 9.29899 0.658291 9.10373 0.853554L1.95728 8L9.10373 15.1464C9.29899 15.3417 9.29899 15.6583 9.10373 15.8536C8.90847 16.0488 8.59188 16.0488 8.39662 15.8536L1.25017 8.70711Z"
                      fill="#1695A3"
                    />
                  </svg>
                  Transfers</router-link
                >
                <router-link
                  :to="{ path: 'details', query: $route.query }"
                  class="active"
                  v-if="step == 5"
                  ><svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.25017 8.70711C0.859645 8.31658 0.859644 7.68342 1.25017 7.29289L8.39662 0.146446C8.59188 -0.0488155 8.90847 -0.0488155 9.10373 0.146446C9.29899 0.341709 9.29899 0.658291 9.10373 0.853554L1.95728 8L9.10373 15.1464C9.29899 15.3417 9.29899 15.6583 9.10373 15.8536C8.90847 16.0488 8.59188 16.0488 8.39662 15.8536L1.25017 8.70711Z"
                      fill="#1695A3"
                    />
                  </svg>
                  Details</router-link
                >
              </div>

              <span>Step {{ step }}/5</span>
            </div>
            <div
              class="col col-lg-10 d-none d-sm-flex align-items-center justify-content-lg-center justify-content-end breadcrumbs"
              v-if="!hideBreadcrumbs"
            >
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <router-link
                    :to="{ path: 'activities', query: $route.query }"
                    :class="{ active: step == 1 }"
                    >Activities</router-link
                  >
                  <span
                    ><svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.75001 7.29289C9.14053 7.68342 9.14053 8.31658 8.75001 8.70711L1.60355 15.8536C1.40829 16.0488 1.09171 16.0488 0.896447 15.8536C0.701184 15.6583 0.701184 15.3417 0.896447 15.1464L8.0429 8L0.896447 0.853553C0.701184 0.658291 0.701184 0.341709 0.896447 0.146447C1.09171 -0.0488155 1.40829 -0.0488155 1.60355 0.146447L8.75001 7.29289Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </li>
                <li class="list-inline-item">
                  <router-link
                    :to="{ path: 'rooms', query: $route.query }"
                    :class="{ disabled: step < 2, active: step == 2 }"
                    >Rooms</router-link
                  >
                  <span
                    ><svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.75001 7.29289C9.14053 7.68342 9.14053 8.31658 8.75001 8.70711L1.60355 15.8536C1.40829 16.0488 1.09171 16.0488 0.896447 15.8536C0.701184 15.6583 0.701184 15.3417 0.896447 15.1464L8.0429 8L0.896447 0.853553C0.701184 0.658291 0.701184 0.341709 0.896447 0.146447C1.09171 -0.0488155 1.40829 -0.0488155 1.60355 0.146447L8.75001 7.29289Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </li>
                <li class="list-inline-item">
                  <router-link
                    :to="{ path: 'transfers', query: $route.query }"
                    :class="{ disabled: step < 3, active: step == 3 }"
                    >Transfers</router-link
                  >
                  <span
                    ><svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.75001 7.29289C9.14053 7.68342 9.14053 8.31658 8.75001 8.70711L1.60355 15.8536C1.40829 16.0488 1.09171 16.0488 0.896447 15.8536C0.701184 15.6583 0.701184 15.3417 0.896447 15.1464L8.0429 8L0.896447 0.853553C0.701184 0.658291 0.701184 0.341709 0.896447 0.146447C1.09171 -0.0488155 1.40829 -0.0488155 1.60355 0.146447L8.75001 7.29289Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </li>
                <li class="list-inline-item">
                  <router-link
                    :to="{ path: 'details', query: $route.query }"
                    :class="{ disabled: step < 4, active: step == 4 }"
                    >Details</router-link
                  >
                  <span
                    ><svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.75001 7.29289C9.14053 7.68342 9.14053 8.31658 8.75001 8.70711L1.60355 15.8536C1.40829 16.0488 1.09171 16.0488 0.896447 15.8536C0.701184 15.6583 0.701184 15.3417 0.896447 15.1464L8.0429 8L0.896447 0.853553C0.701184 0.658291 0.701184 0.341709 0.896447 0.146447C1.09171 -0.0488155 1.40829 -0.0488155 1.60355 0.146447L8.75001 7.29289Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </li>
                <li class="list-inline-item">
                  <router-link
                    :to="{ path: 'review', query: $route.query }"
                    :class="{ disabled: step < 5, active: step == 5 }"
                    >Review</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <router-view />
    </div>
    <footer class="body-n mt-5">
      <div class="container">
        <div class="py bottom">
          <div class="d-flex align-items-center">
            <div class="left">
              <div class="d-flex align-items-center">
                <div class="date">
                  © 2020 ZuBlu
                </div>
                <a href="/terms-conditions">Terms &amp; Conditions</a>
                <a href="/terms-of-website-use">Terms of use</a>
                <a href="/privacy-policy">Privacy Policy</a>
              </div>
            </div>
            <div class="right">
              <span>ZuBlu is Asia’s leading dive travel company</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");

$grey: #727272;
$teal: #1695a3;
$teal-hover: #25b6c6;
$red: #e12f22;
$blue: #0f2644;
$blue-hover: #245088;
$green: #4caf50;
$orange: #eb7d00;
$orange-hover: #f38a0e;

header {
  top: 0;
  left: 0;
  width: 100%;
  background: none;
  z-index: 3;
}

@media (min-width: 1400px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 1280px !important;
  }
}

footer .container {
  padding-left: 15px;
  padding-right: 15px;
}

header.body-n {
  max-width: 100%;
  overflow: hidden;
}

#app .app-main {
  font-family: "Rubik", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
  font-size: 16px;
  line-height: 24px;

  hr {
    width: 100%;
  }

  .slick-next {
    right: 16px;
    background: url(./assets/arrow-right.png) no-repeat center;
    background-size: contain;
    width: 36px;
    height: 36px;
    z-index: 2;
  }

  .slick-prev {
    left: 16px;
    background: url(./assets/arrow-left.png) no-repeat center;
    background-size: contain;
    width: 36px;
    height: 36px;
    z-index: 2;
  }

  .slick-dots {
    position: absolute;
    bottom: 0;

    background: -webkit-linear-gradient(
      rgba(34, 34, 34, 0) 0%,
      rgba(34, 34, 34, 0.32) 100%
    );
    background: -o-linear-gradient(
      rgba(34, 34, 34, 0) 0%,
      rgba(34, 34, 34, 0.32) 100%
    );
    background: linear-gradient(
      rgba(34, 34, 34, 0) 0%,
      rgba(34, 34, 34, 0.32) 100%
    );
  }

  .slick-dots li {
    margin-bottom: 19px;
    margin-left: 6px;
    margin-right: 6px;
    width: 8px;
    height: 8px;

    &.slick-active {
      button {
        transform: scale(1.2);
      }
    }

    button {
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 90px;
      font-size: 0px;
      padding: 0;

      &::before {
        display: none;
      }
    }
  }

  .breadcrumbs-mobile {
    a {
    }

    span {
      font-size: 16px;
    }
  }

  .breadcrumbs {
    li {
      svg {
      }

      span {
        margin-left: 12px;
      }

      a.disabled + span > svg {
        stroke: #b8b8b8;
      }
    }
    a {
      font-weight: 500;
      color: #1695a3;
      &:hover {
        text-decoration: none;
        color: $teal-hover;
      }
      &.router-link-active,
      &.active {
        color: #222;
      }
      &:first-child {
        padding-left: 0;
      }
      &.disabled {
        color: #b8b8b8;
        pointer-events: none;
      }
    }
  }

  a {
    color: $teal;
  }
  strong {
    font-weight: 500;
  }
  h1 {
    font-size: 40px;
    font-weight: 500;
    line-height: 47px;
    margin-bottom: 8px;
  }
  .subheading {
    font-size: 16px;
    line-height: 24px;
    color: $grey;
    display: block;
    margin-bottom: 1rem;
  }
  h2 {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    margin: 32px 0 24px;
  }
  h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }
  h4 {
    font-weight: normal;
    font-size: 20px;
    line-height: 1em;
    margin: 0;
  }
  .smaller {
    font-size: 80%;
    h4 {
      font-size: 16px;
    }
  }
  .text-grey {
    color: $grey;
  }
  .text-teal {
    color: $teal;
  }
  .text-blue {
    color: $blue;
  }
  .button {
    display: inline-flex;
    flex-direction: row;
    border-radius: 4px;
    padding: 14px 20px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    border: 1px solid $blue;
    color: $blue;
    text-decoration: none;
    align-items: center;
    &:not([disabled]):hover {
      background-color: #f2f7ff;
    }
    &.button-teal {
      background-color: $teal;
      border-color: $teal;
      color: #fff;
      &:not([disabled]):hover {
        background-color: $teal-hover;
        border-color: $teal-hover;
      }
    }
    &.button-teal-outline {
      color: $teal;
      border-color: $teal;
      background-color: #fff;
      &:not([disabled]):hover {
        background-color: #f2feff;
      }
    }
    &.button-orange {
      background-color: $orange;
      border-color: $orange;
      color: #fff;
      &:not([disabled]):hover {
        background-color: $orange-hover;
        border-color: $orange-hover;
      }
    }

    &.button-sm {
      height: 40px;
      line-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .my-6 {
    margin-top: 6rem !important;
    margin-bottom: 6rem !important;
  }

  .facility-icon {
    display: inline-block;
    margin-right: 8px;
  }

  img.selected {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .card-option {
    max-width: 470px;
    min-height: 200px;
    padding: 24px;
    background: #fff;
    border-radius: 4px;

    border: 1px solid #e0e0e0;

    &.selected {
      background: #ecf7f8;
      border: 1px solid #1695a3;
    }

    span.price {
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      color: #222222;
    }
  }

  .card {
    &.warning {
      border-left: 4px solid $red;
    }
    &.info {
      border-left: 4px solid $blue;
    }
    &.approval {
      border-left: 4px solid $green;
    }
    & + .card {
      margin-top: 1em;
    }
  }

  .stage-notification {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    &.info {
      background: #f5f9fc;
      border-radius: 4px;
      border: none;
    }

    &.warning {
      border: 1px solid $red;
      border-left: 4px solid $red;
      background: #fdeeed;
    }
  }

  .rounded-circle {
    border: 2px solid $blue;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    &.info-icon {
      min-width: 20px;
      .fa-info {
        font-size: 0.7rem;
      }
    }
  }
}
</style>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      hideBreadcrumbs: false,
      step: 1
    };
  },
  watch: {
    $route: function(to) {
      this.step = to.meta.step;
      // Check if given route is true, if it is then hide Nav.
      if (this.$route.path === "/thank-you") {
        this.hideBreadcrumbs = true;
      } else {
        this.hideBreadcrumbs = false;
      }
    }
  },
  methods: {
    ...mapActions(["loadConfig"])
  },
  mounted() {
    this.loadConfig();
  }
};
</script>
