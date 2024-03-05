<template>
  <main>
    <div class="mt-5">
      <div class="d-flex justify-content-center">
        <h4>Category</h4>
      </div>
      <Suspense>
        <template #default>
          <Category />
        </template>
        <template #fallback> 
          <Loader />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import Category from './dashboard/Category.vue'
import Loader from './component_layouts/lazy_load.vue'
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
