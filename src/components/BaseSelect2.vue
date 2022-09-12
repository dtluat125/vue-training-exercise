<template>
  <div class="select-wrapper">
    <div class="text-field">
      <label
        v-if="label"
        :class="{ focus: !!modelValue, 'verticle-center': true }"
        >{{ label
        }}<span v-if="modelValue" class="value">: {{ modelValue }}</span></label
      >
      <select
        required
        :value="modelValue ? modelValue : defaultValue"
        :class="{ focus: !!modelValue, field: true }"
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
          :label="option.label"
        >
          {{ label }}: {{ option.label }}
          <!-- {{ option }} -->
        </option>
      </select>
      <div class="end-icon">
        <EndIcon2 />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EndIcon2 from "@/assets/icons/end-icon-2.svg";
import { defineProps, onMounted, toRefs, withDefaults } from "vue";

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

onMounted(() => {
  const select = document.querySelector("select");
  if (select && modelValue)
    select.innerHTML = `${label.value}: ${select.innerHTML}`;
});
</script>

<style lang="scss" scoped>
.select-wrapper {
  .text-field {
    position: relative;
    display: inline-block;
    user-select: none;
    label {
      transition: all 0.1s ease-out;
      position: absolute;
      font-size: 14px;
      left: 2px;
      padding: 0 12px;
      color: #a2a6b0;
      font-weight: 600;
      transform-origin: left top;
      pointer-events: none;
      background-color: white;
      &.focus {
        .value {
          color: #000000;
          text-transform: capitalize;
        }
      }
    }
    select {
      font-family: inherit;
      border: 2px solid #cacdd8;
      border-radius: 2px;
      &.focus {
        min-width: 176px;
      }
      &:focus,
      &:focus-visible,
      &:hover {
        border: 2px solid #5a5b6a;
        outline: none;
      }
      border-radius: 4px;
      padding: 12px 12px;
      padding-right: 34px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-weight: 600;
      .label {
        color: #a2a6b0 !important;
      }
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
