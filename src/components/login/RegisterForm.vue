<template>
    <div class="card"> 
        <div class="d-flex justify-content-center flex-column">
            <div class="section-header">
                <h3>Register</h3>
                <p>Silahkan lengkapi data berikut untuk melakukan pendaftaran</p>
            </div>
            <div v-if="alert.status" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{alert.title}}</strong> {{alert.message}}.
                <button type="button" class="btn-close" @click="alert.status = false"></button>
            </div>
            <div class="form-section">
                <Form @formSubmit="register()">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="nameHelp" v-model="formData.name">
                        <div v-for="error in v$.name.$errors" :key="error.$uid" id="nameHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" class="form-control" id="email" aria-describedby="emailHelp" v-model="formData.email">
                        <div v-for="error in v$.email.$errors" :key="error.$uid" id="emailHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" aria-describedby="passHelp" v-model="formData.password">
                        <div v-for="error in v$.password.$errors" :key="error.$uid" id="passHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" aria-describedby="cpassHelp" v-model="formData.confirmPassword">
                        <div v-for="error in v$.confirmPassword.$errors" :key="error.$uid" id="cpassHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <button type="submit" class="btn btn-primary"><span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Register</button>
                    <div class="sub-text">
                        <p><router-link to="/">Back to login</router-link></p>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
//this is Composition API
import { computed, inject, reactive, ref } from 'vue'
import Form from '../component_layouts/form.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
import { useStore } from 'vuex'
import router from '@/router'

const swal = inject('$swal');
const formData = reactive({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('This name cannot be empty', required)
        },
        email: { 
            required: helpers.withMessage('This email cannot be empty', required), 
            email 
        },
        password: { 
            required: helpers.withMessage('This password cannot be empty', required), 
            minLength: minLength(8) 
        },
        confirmPassword: { 
            required: helpers.withMessage('This confirm password cannot be empty', required), 
            sameAs: sameAs(formData.password) 
        }
    }
})

const v$ = useVuelidate(rules, formData);
const store = useStore()
const alert = reactive({
    status: false,
    title: '',
    message: ''
})
const loading = ref(false)

const register = async () => {
    const result = await v$.value.$validate();
    if(result){
        loading.value = true
        const res = await store.dispatch('registerUser', formData)
        if(res.status == false){
            alert.status = true;
            alert.title = "Error !";
            alert.message = res.message.data.email[0]
            loading.value = false
        }else {
            loading.value = false
            swal.fire({
                icon: 'success',
                toast: true,
                title: 'Register Success !',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: 'top-end',
            });
            router.push('/')
        }
    }else {
        swal.fire({
            icon: 'error',
            toast: true,
            title: 'Registration failed !',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            position: 'top-end',
        });
    }
}

</script>

<style scoped>
  .section-header {
    padding: 1rem;
    text-align: center;
    color: var(--color-text);
  }

  h3 {
      font-weight: bold;
  }

  .section-header p {
    font-size: 0.875rem;
    font-weight: 300;
  }

  .form-section {
      padding: 2rem;
  }
  
  .btn.btn-primary {
      margin-top: 2rem;
      width: 100% !important;
  }

  .sub-text {
      padding-top: 1rem;
  }

  .alert {
      margin: 0 2rem 0 2rem;
  }
</style>