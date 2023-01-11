<script setup>
import { defineProps } from "vue";
const props = defineProps(["value"]);
</script>

<template>
  <div v-if="value" class="flex justify-between items-center mt-10">
    <h5 class="capitalize">{{ value.title }}</h5>
    <div>{{ value.number }}</div>
  </div>
</template>
