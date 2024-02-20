<script setup>
import LoginForm from '../components/login/LoginForm.vue'
</script>

<template>
  <main>
    <div class="container">
      <div class="row box-web">
        <div class="col-lg-6">
          <LoginForm />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .box-web {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .section-header {
    padding: 1rem;
    text-align: center;
    color: var(--color-text);
  }

  .section-header p {
    font-size: 0.875rem;
    font-weight: 300;
  }
</style>
