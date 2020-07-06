<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center pt-md-5 mt-md-5">
        <img
          src="/assets/icons/manta-ray.svg"
          alt="manta ray"
          class="my-md-5 mb-5"
        />
        <h1>
          Thank you for your booking enquiry,
          {{ config.config.form_data.first_name }}.
        </h1>
        <h4>We will contact you within 24 hours to finalise your trip.</h4>
        <div
          class="d-flex flex-row flex-wrap flex-sm-nowrap justify-content-center my-5"
        >
          <a
            :href="config.config.resort_url"
            class="button button-teal-outline mx-3 mb-3"
            >Back to resort</a
          >
          <a
            :href="config.config.location_url"
            class="button button-teal-outline mx-3 mb-3"
            >Visit destination</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$teal: #1695a3;
$darkGrey: #4c4c4c;

h1 {
  margin-bottom: 0.8em !important;
}
p {
  font-size: 20px;
  line-height: 34px;
}
@media screen and (max-width: 575px) {
  .button {
    width: 100%;
    justify-content: center;
  }
}
</style>

<script>
export default {
  name: "thank-you",
  data() {
    return {};
  },
  computed: {
    config() {
      return this.$store.state.config;
    }
  },

  mounted() {
    this.$nextTick(() => {
      // element which needs to be scrolled to
      var element = document.getElementById("app");
      // scroll to element
      element.scrollIntoView();
    });
  }
};
</script>
