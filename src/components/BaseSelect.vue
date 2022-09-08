<template>
  <div class="select-wrapper">
    <div class="text-field">
      <label
        v-if="label"
        :class="{ focus: !!modelValue, 'verticle-center': !modelValue }"
        >{{ label }}</label
      >
      <select
        required
        :value="modelValue ? modelValue : defaultValue"
        class="field"
        @change="
          $emit('update:modelValue', ($event?.target as HTMLInputElement).value)
        "
        v-bind="$attrs"
      >
        <option value="">
          {{ label }}
        </option>
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.value"
          :selected="option.value === modelValue"
        >
          {{ option.label }}
          <!-- {{ option }} -->
        </option>
      </select>
      <div class="end-icon">
        <BlueArrow />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, toRefs, withDefaults } from "vue";
import BlueArrow from "@/assets/icons/end-icon.svg";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  modelValue?: string;
  options: Option[];
  endIcon?: string | Element;
  defaultValue?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  label: "",
  options: () => [{ label: "No Options", value: "" }],
  modelValue: "",
  // endIcon: BlueArrow,
  defaultValue: "",
});

const { label, modelValue, options, endIcon, defaultValue } = toRefs(props);
</script>

<style lang="scss" scoped="">
.select-wrapper {
  .text-field {
    position: relative;
    display: inline-block;
    user-select: none;
    label {
      transition: all 0.1s ease-out;

      position: absolute;
      font-size: 14px;
      left: 1px;
      padding: 0 12px;
      color: #787885;
      transform-origin: left top;
      pointer-events: none;
      background-color: white;
      &.focus {
        background-color: white;
        font-weight: 500;
        line-height: 16px;
        left: 12px;
        transform: translateY(-50%) scale(0.7);
        padding: 0px 2px;
      }
    }
    select {
      font-family: inherit;

      border: 1px solid #b4b4bb;
      &:focus,
      &:focus-visible,
      &:hover {
        border: 1px solid #5a5b6a;
        outline: none;
      }
      border-radius: 4px;
      padding: 8px 12px;
      padding-right: 34px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-weight: 500;
    }
    .end-icon {
      position: absolute;
      right: 12px;
      height: 100%;
      top: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
