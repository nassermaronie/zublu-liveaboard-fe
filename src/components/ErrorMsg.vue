<template>
  <div class="warning card notification mt-4 stage-noftification" v-if="error">
    <div class="card-body d-flex align-items-center">
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.99999 0.125L0.12323 15.5H17.8768L8.99999 0.125ZM8.99999 2.125L1.85528 14.5H16.1447L8.99999 2.125Z"
          fill="#E12F22"
        />
        <path
          d="M9.49999 12.375C9.49999 12.6511 9.27613 12.875 8.99999 12.875C8.72385 12.875 8.49999 12.6511 8.49999 12.375C8.49999 12.0989 8.72385 11.875 8.99999 11.875C9.27613 11.875 9.49999 12.0989 9.49999 12.375Z"
          fill="#E12F22"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.99999 5C9.27613 5 9.49999 5.22386 9.49999 5.5V10.375C9.49999 10.6511 9.27613 10.875 8.99999 10.875C8.72385 10.875 8.49999 10.6511 8.49999 10.375V5.5C8.49999 5.22386 8.72385 5 8.99999 5Z"
          fill="#E12F22"
        />
      </svg>

      <div class="ml-2" v-html="error_msg[error]"></div>
    </div>
  </div>
</template>

<script>
import error_msg from "@/error_msg";

export default {
  name: "ErrorMsg",
  props: {
    error: String
  },
  data() {
    return {
      error_msg: {}
    };
  },
  mounted() {
    this.error_msg = error_msg;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
