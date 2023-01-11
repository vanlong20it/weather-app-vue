<script setup>
import { defineProps } from "vue";
import DetailItem from "./DetailItem.vue";
const props = defineProps(['data']);
</script>

<template>
  <div
    class="transition-all duration-700 inactive"
    :class="props.data.length > 0 ? 'active' : null"
  >
    <div v-if="props.data.length > 0">
      <h4 class="text-xl">Weather details</h4>
      <ul>
        <li v-for="item in props.data" :key="item.id">
          <DetailItem :value="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
