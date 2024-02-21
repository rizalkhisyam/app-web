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
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword2" v-model="c_password">
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
import { inject } from 'vue'
import Form from '../component_layouts/form.vue'

const email = ''
const password = ''
const c_password = ''
const swal = inject('$swal');

const register = async () => {
    console.log("oke");
    swal.fire({
        icon: 'success',
        toast: true,
        title: 'Register Success !',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        position: 'top-end',
    });
}

</script>

<style scoped>
  .section-header {
    padding: 1rem;
    text-align: center;
    color: var(--color-text);
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