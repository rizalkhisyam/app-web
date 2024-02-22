<template>
    <div class="card"> 
        <div class="d-flex justify-content-center flex-column">
            <div class="section-header">
                <h3>Register</h3>
                <p>Silahkan lengkapi data berikut untuk melakukan pendaftaran</p>
            </div>
            <div class="form-section">
                <Form @formSubmit="register()">
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
                    <button type="submit" class="btn btn-primary">Register</button>
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
 
const swal = inject('$swal');
const formData = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const rules = computed(() => {
    return {
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

const register = async () => {
    const result = await v$.value.$validate();
    if(result){
        swal.fire({
            icon: 'success',
            toast: true,
            title: 'Register Success !',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            position: 'top-end',
        });
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
</style>