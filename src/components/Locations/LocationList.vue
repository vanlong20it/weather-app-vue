<script setup>
import LocationItem from "./LocationItem.vue";
import { defineProps, defineEmits } from "vue";
defineProps(["list"]);
defineEmits(["select"]);
</script>

<template>
  <div v-if="list.length > 0">
    <ul>
      <li v-for="item in list" :key="item.id">
        <LocationItem :value="item" @select="$emit('select', item.name)" />
      </li>
    </ul>
  </div>
</template>
