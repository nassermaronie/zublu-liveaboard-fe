<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-8">
            <h1>Who is coming?</h1>
            <form>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  v-bind:class="{
                    'is-invalid': dirty && $v.form_data.first_name.$invalid
                  }"
                  class="form-control"
                  id="firstName"
                  placeholder="John"
                  v-model="form_data.first_name"
                />
                <div
                  class="invalid-feedback"
                  v-if="dirty && !$v.form_data.first_name.required"
                >
                  Please enter your first name
                </div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  v-bind:class="{
                    'is-invalid': dirty && $v.form_data.last_name.$invalid
                  }"
                  class="form-control"
                  id="lastName"
                  placeholder="Doe"
                  v-model="form_data.last_name"
                />
                <div
                  class="invalid-feedback"
                  v-if="dirty && !$v.form_data.last_name.required"
                >
                  Please enter your last name
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-bind:class="{
                    'is-invalid': dirty && $v.form_data.email.$invalid
                  }"
                  class="form-control"
                  id="email"
                  placeholder="john.appleseed@example.com"
                  v-model="form_data.email"
                />
                <div
                  class="invalid-feedback"
                  v-if="dirty && !$v.form_data.email.required"
                >
                  Please enter your email
                </div>
                <div
                  class="invalid-feedback"
                  v-if="dirty && !$v.form_data.email.email"
                >
                  Please enter a valid email
                </div>
              </div>
              <div class="form-group" v-if="form_data.country">
                <label for="country">Country</label>
                <select
                  class="form-control"
                  v-bind:class="{
                    'is-invalid': dirty && $v.form_data.country.$invalid
                  }"
                  id="country"
                  v-model="form_data.country"
                >
                  <option></option>
                  <option
                    v-for="countryObj in countryCodes"
                    :selected="form_data.country.name == countryObj.name"
                    :value="countryObj"
                    :key="countryObj.code"
                    >{{ countryObj.name }} ({{ countryObj.dial_code }})</option
                  >
                </select>
                <div
                  class="invalid-feedback"
                  v-if="dirty && !$v.form_data.country.required"
                >
                  Please select your country
                </div>
              </div>
              <div class="form-group" v-if="form_data.country">
                <label for="country">Phone</label>
                <div
                  class="input-group flex-nowrap"
                  v-bind:class="{
                    'is-invalid': dirty && $v.form_data.phone.$invalid
                  }"
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{
                      form_data.country.dial_code
                    }}</span>
                  </div>
                  <input
                    type="text"
                    v-bind:class="{
                      'is-invalid': dirty && $v.form_data.phone.$invalid
                    }"
                    class="form-control"
                    placeholder=""
                    v-model="form_data.phone"
                  />
                </div>
                <div
                  class="invalid-feedback"
                  v-if="dirty && !$v.form_data.phone.required"
                >
                  Please enter your phone
                </div>
              </div>
              <div class="form-group">
                <label for="country">Special requests (optional)</label>
                <textarea
                  rows="5"
                  class="form-control"
                  id="email"
                  placeholder="Anything you’d like to let us know?"
                  v-model="form_data.remarks"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        <button @click="checkStep(true)" class="button button-teal mt-4">
          Continue
        </button>
      </div>
      <div class="col-lg-4 sidebar ml-auto">
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$darkGrey: #4c4c4c;

h1 {
  margin-bottom: 0.8em !important;
}
label {
  color: $darkGrey;
  font-size: 16px;
  line-height: 24px;
}
.form-control {
  color: #222;
  font-size: 20px;
}
.input-group-text {
  background-color: transparent;
}
.is-invalid .input-group-text {
  border-color: #dc3545;
}
.input-group-prepend .input-group-text {
  padding-right: 0;
}
.input-group > .form-control:not(:first-child) {
  border-left: none;
  padding-left: 8px;
}
input.form-control,
textarea.form-control,
select.form-control {
  background: #fff;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "zublu-details",
  components: {
    Sidebar
  },
  mixins: [validationMixin],

  validations: {
    form_data: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required,
        email
      },
      country: {
        required
      },
      phone: {
        required
      }
    }
  },
  data() {
    return {
      form_data: {},
      dirty: false
    };
  },
  mounted() {
    this.getCountry();
    this.form_data = this.config.config.form_data;

    this.$nextTick(() => {
      // element which needs to be scrolled to
      var element = document.getElementById("app");
      // scroll to element
      element.scrollIntoView();
    });
  },
  watch: {
    // selectedCountry: function (country) {
    // 	this.$store.commit('UPDATE_FORMDATA_COUNTRY_CODE', country.dial_code);
    // 	this.$store.commit('UPDATE_FORMDATA_COUNTRY', country.name);
    // },
  },
  computed: {
    config() {
      if (!this.$store) return null;
      return this.$store.state.config;
    },
    ...mapState({
      // firstName: 'form_data.firstName',
      // lastName: 'form_data.lastName',
      // email: 'form_data.email',
      // country: 'form_data.country',
      // country_code: 'form_data.country_code',
      // phone: 'form_data.phone',
      // remarks: 'form_data.remarks',
    }),
    countryCodes() {
      return this.$store.state.countryCodes;
    }
  },
  methods: {
    ...mapActions(["saveDetail"]),
    nextStep() {
      this.$router.push({
        name: "review",
        query: { ...this.$store.state.route.query }
      });
    },
    checkStep(next) {
      this.dirty = true;

      if (!this.$v.$invalid) {
        this.saveStep(next);
      }

      this.$nextTick(() => {
        // element which needs to be scrolled to
        var element = document.querySelector(".is-invalid");
        // scroll to element
        element.scrollIntoView();
      });
    },
    saveStep(next) {
      var payload = this.config.config;
      payload.form_data = this.form_data;
      if (typeof next != "undefined") payload.stage = 5;
      else payload.stage = 4;

      this.saveDetail({ config: payload });
    },
    getCountry() {
      var that = this;
      this.$http.get("http://ip-api.com/json").then(function(response) {
        that.form_data.country = _.find(that.countryCodes, function(o) {
          return o.code == response.data.countryCode;
        });
      });
    }
  }
};
</script>
