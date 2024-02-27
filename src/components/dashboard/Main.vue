<template>
    <section class="intro">
        <easy-data-table
            :headers="headers"
            :items="items"
        />
        <h4>Category Products</h4>
        <div class="bg-image h-100 mb-5">
            <div class="mask d-flex align-items-center h-100">
                <div class="container">
                    <div class="row justify-content-center">
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
        <h4>Table Products</h4>
        <div class="bg-image h-100">
            <div class="mask d-flex align-items-center h-100">
                <div class="container">
                    <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="card shadow-2-strong" style="background-color: #f5f7fa;">
                        <div class="card-body">
                            <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <thead>
                                <tr>
                                    <!-- <th scope="col">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                    </th> -->
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody v-for="data in products" :key="data.id">
                                <tr>
                                    <!-- <th scope="row">
                                    <div class="form-check">
                                        {{formData.checked}}
                                        <input class="form-check-input" type="checkbox" id="flexCheckDefault1" v-model="formData.checked" :key="data.id"/>
                                    </div>
                                    </th> -->
                                    <td>{{data.name}}</td>
                                    <td>{{data.categories.category_name}}</td>
                                    <td>{{data.total}}</td>
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
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore()

onMounted(() => {
    getDataProducts()
    getDataCategory()
    console.log(store.state.product.products);
})

const products = computed(() => {
    return store.getters.products
})

const categories = computed(() => {
    return store.getters.categories
})

const formData = reactive({
    checked: null
})

const getDataProducts = async () => {
    await store.dispatch('getDataProducts')
}

const getDataCategory = async () => {
    await store.dispatch('getDataCategories')
}

const headers = [
          { text: "Name", value: "name" },
          { text: "Height (cm)", value: "height", sortable: true },
          { text: "Weight (kg)", value: "weight", sortable: true },
          { text: "Age", value: "age", sortable: true }
        ];

        const items = [
          { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
          { "name": "James", "height": 180, "weight": 75, "age": 21 },
          { "name": "Jordan", "height": 181, "weight": 73, "age": 22 }
        ];

</script>
