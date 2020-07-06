<template src="./template"></template>
<style lang="scss" src="./style.scss"></style>
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
