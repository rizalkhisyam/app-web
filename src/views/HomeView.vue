<template>
  <main>
    <Navbar />
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup>
import Navbar from '../components/component_layouts/navbar.vue'
</script>

<style scoped>

</style>
