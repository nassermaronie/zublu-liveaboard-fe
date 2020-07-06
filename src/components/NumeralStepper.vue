<template>
  <div
    class="stepper-container"
    :class="{
      small: size === 'small',
      regular: size === 'regular',
      large: size === 'large'
    }"
  >
    <button
      :size="size"
      @click="() => add(-1)"
      :disabled="isMin"
      class="button button-small"
    >
      <svg
        width="18"
        height="2"
        viewBox="0 0 18 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 1C0 0.723858 0.223858 0.5 0.5 0.5H17.5C17.7761 0.5 18 0.723858 18 1C18 1.27614 17.7761 1.5 17.5 1.5H0.5C0.223858 1.5 0 1.27614 0 1Z"
          fill="#1695A3"
        />
      </svg>
    </button>
    <div class="value">{{ value }}</div>
    <button
      :size="size"
      @click="() => add(1)"
      :disabled="isMax"
      class="button button-small"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 9C0 8.72386 0.223858 8.5 0.5 8.5H17.5C17.7761 8.5 18 8.72386 18 9C18 9.27614 17.7761 9.5 17.5 9.5H0.5C0.223858 9.5 0 9.27614 0 9Z"
          fill="#1695A3"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 18C8.72386 18 8.5 17.7761 8.5 17.5V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V17.5C9.5 17.7761 9.27614 18 9 18Z"
          fill="#1695A3"
        />
      </svg>
    </button>
    <label class="label" v-if="label">{{ label }}</label>
  </div>
</template>
<script>
export default {
  name: "NumeralStepper",
  props: {
    setvalue: Number,
    size: {
      type: String,
      default: "small"
    },
    label: String,
    max: Number
  },
  data() {
    return {
      value: 0
    };
  },
  computed: {
    isMin() {
      return this.value === 0;
    },
    isMax() {
      return this.value === this.max;
    }
  },
  methods: {
    add(val) {
      this.value += val;
      this.updateStepperVal(val);
    },
    updateStepperVal() {
      this.$emit("updateStepperVal", this.value);
    }
  },
  mounted() {
    if (this.setvalue) this.value = parseInt(this.setvalue);
  }
};
</script>
<style lang="scss" scoped>
$teal: #1695a3;
$grey: #727272;
$disableColor: #1695a3;
.stepper-container {
  margin-top: 0;
  display: flex;
  align-items: center;
  .value,
  .label {
    color: #222;
  }
  button {
    text-align: center;
    background-color: #fff;
    &.button-small {
      padding: 0 !important;
      font-weight: normal !important;
      justify-content: center;
      color: $teal !important;
      border-color: $teal !important;
      width: 36px !important;
      height: 36px !important;
    }
    &:disabled {
      opacity: 0.32;
      border-color: $disableColor !important;
      color: $disableColor !important;

      path {
        fill: $disableColor;
      }
    }
    &:not([disabled]):hover {
      background-color: #f2feff !important;
    }
  }
  &.small {
    .value,
    .label {
      font-size: 14px;
      line-height: 20px;
      margin: 2px 12px;
    }
    button {
      width: 24px;
      height: 24px;
    }
  }
  &.regular {
    .value,
    .label {
      font-size: 16px;
      line-height: 24px;
      margin: 7px 16px;
    }
    .value {
      width: 20px;
      text-align: center;
    }
    button {
      width: 36px;
      height: 36px;
    }
  }
  &.large {
    .value,
    .label {
      font-size: 20px;
      line-height: 30px;
      margin: 9px 20px;
    }
    button {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
