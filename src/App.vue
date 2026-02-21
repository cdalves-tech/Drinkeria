<template>
  <TheNavbar />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/layout/TheNavbar.vue';
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1400px; 
  margin: 0 auto;
  padding: 0 15px;
}

</style>
