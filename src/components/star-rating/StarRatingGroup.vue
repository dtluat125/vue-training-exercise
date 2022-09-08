<template>
  <div>
    <StarRating
      :rating="rating"
      read-only
      :fixed-points="2"
      :star-size="10"
      :round-start-rating="false"
      :increment="0.01"
      active-color="#FB8200"
      active-border-color="#FB8200"
      :border-width="2"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import StarRating from "vue-star-rating";

interface RatingProps {
  rating: number;
}
const props = defineProps<RatingProps>();
const { rating } = toRefs(props);
</script>
