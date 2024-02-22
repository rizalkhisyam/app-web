<template>
    <div class="card"> 
        <div class="d-flex justify-content-center flex-column">
            <div class="section-header">
                <h3>Sign in</h3>
                <p>Silahkan masuk menggunakan akun anda</p>
            </div>
            <div class="form-section">
                <Form @formSubmit="login()">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                        <div v-for="error in v$.email.$errors" :key="error.$uid" id="emailHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" aria-describedby="passHelp" v-model="password">
                        <div v-for="error in v$.password.$errors" :key="error.$uid" id="passHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                    <div class="sub-text">
                        <p>Don't have account yet ? <router-link to="/register">Register</router-link></p>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
//this is options API
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, helpers } from '@vuelidate/validators'
import Form from '../component_layouts/form.vue'

export default {
    setup: () => ({ v$: useVuelidate() }),
    components: {
        Form
    },
    data(){
        return {
            email: '',
            password: ''
        }
    },

    validations(){
        return {
            email: { required: helpers.withMessage('This email cannot be empty', required), email },
            password: { required: helpers.withMessage('This password cannot be empty', required), minLength: minLength(8) }
        }
    },

    methods: {
        async login() {
            const res = await this.$store.dispatch('loginAuth')
            console.log(this.$store.state.token);
            console.log(res);
            const result = await this.v$.$validate()
            if(result){
                this.$swal.fire({
                    toast: true,
                    icon: 'success',
                    title: 'Login Succcess !',
                    showConfirmButton: false,
                    position: 'top-end',
                    timer: 2000,
                    timerProgressBar: true,
                })
            }else {
                this.$swal.fire({
                    toast: true,
                    icon: 'error',
                    title: 'Login Failed !',
                    showConfirmButton: false,
                    position: 'top-end',
                    timer: 2000,
                    timerProgressBar: true,
                })
            }
        }
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