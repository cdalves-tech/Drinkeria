<template>

  <TheNavbar />
  <HomeView />

  <div class="container">
  </div>
</template>

<script setup>
import TheNavbar from './components/layout/TheNavbar.vue';
import HomeView from './components/layout/HomeView.vue';


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
