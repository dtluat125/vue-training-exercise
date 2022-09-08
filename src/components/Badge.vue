<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="badge-container" :style="{ backgroundColor, color }">
    {{ content }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from "vue";
interface BadgeProps {
  content: string;
  backgroundColor: string;
  color: string;
}
const props = defineProps<BadgeProps>();
const { content, backgroundColor, color } = toRefs(props);
</script>

<style scoped lang="scss">
.badge-container {
  padding: 4px 10px;
  border-radius: 4px;
}
</style>
