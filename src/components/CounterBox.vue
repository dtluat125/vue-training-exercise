<template>
  <div class="counter-box">
    <span class="value">{{ props.modelValue }}</span>
    <div class="control-group">
      <div @click="emit('update:modelValue', modelValue + 1)">
        <CounterUpIcon />
      </div>
      <div
        :class="{ disabled: modelValue < 1 }"
        @click="
          emit('update:modelValue', modelValue - 1 > 0 ? modelValue - 1 : 0)
        "
      >
        <CounterDownIcon />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CounterUpIcon from "@/assets/icons/counter-up-arrow.svg";
import CounterDownIcon from "@/assets/icons/counter-down-arrow.svg";

interface CounterBoxProps {
  modelValue: number;
}

// eslint-disable-next-line no-undef
const props = defineProps<CounterBoxProps>();

// eslint-disable-next-line no-undef
const emit = defineEmits<{ (e: "update:modelValue", value: number): void }>();
</script>

<style lang="scss" scoped>
.counter-box {
  background: #f5f7ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  width: 70px;
  padding: 16px;
  justify-content: center;
  column-gap: 14px;
  span {
    font-weight: 600;
    user-select: none;
    width: 20px;
  }
  .control-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 14px;
    > div {
      cursor: pointer;
      flex-grow: 0;
      display: flex;
      .disabled {
        pointer-events: none;
      }
    }
  }
}
</style>
