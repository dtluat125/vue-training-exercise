<template lang="">
  <button
    :style="{
      color: props.color,
      backgroundColor: props.outline ? 'transparent' : props.backgroundColor,
      border: props.outline ? `2px solid ${props.color}` : '0px',
      width: props.width ?? 'initial',
      padding: '8px',
    }"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
interface ButtonProps {
  color: string;
  backgroundColor?: string;
  outline?: boolean;
  width?: string;
}
// eslint-disable-next-line no-undef
const props = defineProps<ButtonProps>();
</script>
<style lang="scss" scoped>
button {
  border-radius: 50px;
  user-select: none;
}
</style>
