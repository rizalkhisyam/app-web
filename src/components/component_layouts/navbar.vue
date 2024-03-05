<template>
    <div>
        <header class="p-3 mb-3 border-bottom">
            <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <img class="logo-apps" :src="logo" alt="logo-apps">
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><router-link to="/dashboard" class="nav-link px-2 link-secondary">Overview</router-link></li>
                <li><router-link to="/dashboard/categories" class="nav-link px-2 link-dark">Category</router-link></li>
                <li><router-link to="/dashboard/products" class="nav-link px-2 link-dark">Products</router-link></li>
                </ul>

                <div class="dropdown text-end">
                <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    Muhammad Rizal
                </a>
                <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li @click="logout"><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
                </div>
            </div>
            </div>
        </header>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import logo from '../../assets/logo-apps.svg'
import router from '@/router'

const store = useStore()

const logout = async () => {
    await store.dispatch('logout')
    router.push('/');
}

</script>

<style scoped>
.logo-apps {
    width: 50px;
    margin: 1rem;
}
</style>
