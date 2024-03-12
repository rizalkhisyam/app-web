<template>
    <section class="intro">
        <div class="bg-image h-100">
            <div class="mask d-flex align-items-center h-100">
                <div class="container">
                    <h6>Category</h6>
                    <div class="mt-5 row justify-content-center">
                    <div class="col-12">
                        <div class="card shadow-2-strong" style="background-color: #f5f7fa;">
                        <div class="card-body">
                            <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">Category ID</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody v-for="data in categories" :key="data.id">
                                <tr>
                                    <td>{{data.id}}</td>
                                    <td>{{data.category_name}}</td>
                                    <td>{{data.price}}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm px-3">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore()

const categories = computed(() => {
    return store.getters.categories
})

const getDataCategory = async () => {
    return await store.dispatch('getDataCategories')
}

await getDataCategory()

</script>