<script setup>
import { defineProps } from "vue";
const props = defineProps(["data"]);
</script>

<template>
  <div
    class="transition-all duration-700 inactive"
    :class="props.data ? 'active' : null"
  >
    <div v-if="props.data" class="block gap-5 text-center">
      <h2 class="text-[6rem]">{{ props.data.temp }}&ordm;</h2>
      <div>
        <h3 class="text-4xl">{{ props.data.name }}</h3>
        <p class="mt-2">{{ props.data.time }}</p>
      </div>
      <div>
        <span class="text-7xl">
          <img :src="`http://openweathermap.org/img/wn/${props.data.icon}@2x.png`" :alt="props.data.weather" class="max-w-full w-[100px] h-[100px] object-contain mx-auto block" width="100" height="100">
        </span>
        <h4 class="text-xl">{{ props.data.weather }}</h4>
      </div>
    </div>
  </div>
</template>
<style></style>
