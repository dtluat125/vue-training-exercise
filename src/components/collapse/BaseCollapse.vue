<template>
  <div class="collapse-container">
    <div class="label" @click="open = !open">
      <span> {{ label }}</span> <span><EndIcon2 /></span>
    </div>
    <div :class="{ body: true, open: open }">
      <div class="options-container">
        <div
          v-for="option in options"
          :key="option.label"
          :class="{
            option: true,
            active:
              modelValue == option.value ||
              ((modelValue as any).min && (modelValue as any).min === (option.value as any).min &&
                (modelValue as any).max === (option.value as any).max),
          }"
          @click="
            () => {
              if (onClick) onClick();
              $emit('update:modelValue', option.value);
            }
          "
        >
          <span class="option__label"> {{ option.label }}</span>
          <span>{{ option.num ?? 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, toRefs } from "vue";
import EndIcon2 from "@/assets/icons/end-icon-2.svg";
import { OptionValue } from "./types";

interface Option {
  value: OptionValue;
  label: string;
  num?: number;
}
interface CollapseProps {
  label: string;
  modelValue: OptionValue;
  options: Option[];
  onClick?: () => void;
}

const props = defineProps<CollapseProps>();
const open = ref(true);
const { label, modelValue, options } = toRefs(props);
</script>

<style lang="scss" scoped>
.collapse-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .label {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    &:hover {
      cursor: pointer;
    }
    display: flex;
    justify-content: space-between;
  }

  .body {
    margin-top: 16px;
    height: auto;
    transition: all 0.3s ease;
    .option {
      height: auto;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      &:hover,
      &.active {
        .option__label {
          text-decoration: underline;
        }
      }
    }
    &:not(.open) {
      .option {
        overflow: hidden;
        height: 0;
      }
    }
    .options-container {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
