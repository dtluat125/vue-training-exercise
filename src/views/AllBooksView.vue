<template>
  <div class="all-books">
    All Books
    <div v-for="book in result?.allBooks" :key="book.id" class="book">
      {{ book.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "@/graphql/allBooks.query.gql";

interface Book {
  id: string | number | symbol | undefined;
  title: string;
  description: string;
  rating: number;
  author: string;
  year: number;
}

interface AllBookResult {
  allBooks: Book[];
}
const { result } = useQuery<AllBookResult>(ALL_BOOKS_QUERY);
</script>

<style scoped lang="scss">
.all-books {
  padding-top: 50px;
}
</style>
