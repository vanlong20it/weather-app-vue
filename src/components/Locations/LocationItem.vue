<script setup>
defineProps(["value"]);
defineEmits(["select"]);
</script>

<template>
  <div
    class="py-5 px-5 font-light cursor-pointer hover:bg-orange-400 hover:text-black transition-all"
    @click="$emit('select')"
  >
    {{ value.name }}
  </div>
</template>
