<template>
    <section class="intro">
        <div class="bg-image h-100">
            <div class="mask d-flex align-items-center h-100">
                <div class="container">
                    <h6>Table Products</h6>
                    <div class="mt-5 d-flex justify-content-between mb-2">
                        <div class="d-flex gap-2">
                            <select class="form-select" aria-label="Default select example" v-model="dataTable.limit">
                                <option value="5" selected>Jumlah data</option>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                            </select>
                            <select class="form-select" aria-label="Default select example" v-model="dataTable.short">
                                <option value="" selected>Urutkan</option>
                                <option value="name">Nama</option>
                                <option value="category_id">Category</option>
                                <option value="total">Total</option>
                                <option value="price">Harga</option>
                            </select>
                            <select class="form-select" aria-label="Default select example" v-model="dataTable.order">
                                <option value="DESC" selected>Urutkan</option>
                                <option value="DESC">Terbesar</option>
                                <option value="ASC">Terkecil</option>
                            </select>
                        </div>
                        <div class="input-search header-table">
                            <input type="text" class="form-control" value="" v-model="dataTable.search">
                            <font-awesome-icon class="search-icon" :icon="['fa', 'fa-magnifying-glass']" />
                        </div>
                    </div>
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
                                    <td class="d-flex gap-2">
                                        <button type="button" class="btn btn-danger btn-sm px-2" @click="deleteData(data.id, data.name)">
                                            <font-awesome-icon :icon="['fa', 'fa-trash']" />
                                        </button>
                                        <button type="button" class="btn btn-info btn-sm px-2">
                                            <font-awesome-icon :icon="['fa', 'fa-edit']" />
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                        <div class="container d-flex justify-content-between mt-3">
                            <div>
                                <button class="btn" @click="prev"><font-awesome-icon :icon="['fa', 'fa-arrow-left']" /> Previous</button>
                            </div>
                            <div>
                                <button class="btn" @click="next">Next <font-awesome-icon :icon="['fa', 'fa-arrow-right']" /></button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="container mt-5">
                <h6>Add Data Product</h6>
                <Form class="mt-5 row mb-5" @formSubmit="create()">
                    <div class="col-6 mb-3">
                        <label for="name" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="name" v-model="formData.name">
                        <div v-for="error in v$.name.$errors" :key="error.$uid" id="name" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="col-6 mb-3">
                        <label for="category" class="form-label">Category</label>
                        <select class="form-select" aria-label="Default select example" v-model="formData.category_id">
                            <option v-for="category in categories" :value="category.id" :key="category.id">{{category.category_name}}</option>
                        </select>
                        <div v-for="error in v$.category_id.$errors" :key="error.$uid" id="category" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="col-6 mb-3">
                        <label for="total" class="form-label">Total</label>
                        <input type="number" class="form-control" id="total" aria-describedby="total" v-model="formData.total" min="1">
                        <div v-for="error in v$.total.$errors" :key="error.$uid" id="total" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="col-6 mb-3">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="price" aria-describedby="price" v-model="formData.price" min="1">
                        <div v-for="error in v$.price.$errors" :key="error.$uid" id="price" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary mt-5"><span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    </section>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { helpers, required, numeric } from "@vuelidate/validators";
import { computed, inject, onBeforeMount, onErrorCaptured, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import Form from '../component_layouts/form.vue'

const store = useStore()
const swal = inject('$swal')

const dataTable = reactive({
    short: '',
    order: 'DESC',
    limit: 0,
    offset: 0,
    search: ''
})

const formData = reactive({
    name: '',
    category_id: '',
    total: 0,
    price: 0
})

const prev = () => {
    dataTable.offset--;
}

const next = () => {
    dataTable.offset++;
}

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('This product name cannot be empty', required)
        },
        category_id: { 
            required: helpers.withMessage('This category cannot be empty', required)
        },
        total: { 
            required: helpers.withMessage('This total cannot be empty', required), 
            numeric
        },
        price: { 
            required: helpers.withMessage('This price cannot be empty', required), 
            numeric
        },
    }
})

const v$ = useVuelidate(rules, formData);
const loading = ref(false)

const deleteData = async (id, name) => {
    swal.fire({
        icon: 'warning',
        title: 'Delete product',
        text: `Are you sure want to delete this product "${name}" ?`,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
    }).then( async (action) => {
        if(action.isConfirmed == true){
            const res = await store.dispatch('deleteDataProduct', id)
            if(res.status == true){
                swal.fire({
                icon: 'success',
                toast: true,
                title: `${res.data.message}`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: 'top-end',
            });
            }
            await getDataProducts(dataTable)
        }
    });
}

const create = async () => {
    loading.value = true
    const validator = await v$.value.$validate();
    if(validator == true){
        const res = await store.dispatch('addDataProduct', formData)
        if(res.status == false){
            alert.status = true;
            alert.title = "Error !";
            alert.message = res.message
            loading.value = false
        }else {
            loading.value = false
            swal.fire({
                icon: 'success',
                toast: true,
                title: 'Product successfully added !',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: 'top-end',
            });
            await getDataProducts(dataTable)
        }
    }else {
        loading.value = false
        swal.fire({
            icon: 'error',
            toast: true,
            title: 'Please check input again !',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            position: 'top-end',
        });
    }
}

const products = computed(() => {
    return store.getters.products
})

watch(
    () => products.value,
    (products) => {
        if(products.length <= 0) {
            swal.fire({
                icon: 'warning',
                toast: true,
                title: 'Data produk tidak ditemukan !',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: 'top-end',
            });
        }
    }
)

const categories = computed(() => {
    return store.getters.categories
})

const getDataProducts = async (params) => {
    return await store.dispatch('getDataProducts', params)
}

watch(
  dataTable,
  async () => {
    await getDataProducts(dataTable)
  },
  { immediate: true }
)

const getDataCategory = async () => {
    return await store.dispatch('getDataCategories')
}

onErrorCaptured((error) => {
    console.log("test"+error)
})

await getDataProducts(dataTable)
await getDataCategory()

</script>

<style scoped>
.header-table {
    width: 20%;
}

.input-search {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;
    right: 1rem;
}

.search-icon:hover {
    cursor: pointer;
}

.btn.btn-primary{
    width: 20%;
}
</style>