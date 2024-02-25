<template>
    <div class="card"> 
        <div class="d-flex justify-content-center flex-column">
            <div class="section-header">
                <img class="logo-apps" :src="logo" alt="logo-apps">
                <h3>Sign in</h3>
                <p>Silahkan masuk menggunakan akun anda</p>
            </div>
            <div v-if="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{title}}</strong> {{message}}.
                <button type="button" class="btn-close" @click="this.alert = false"></button>
            </div>
            <div class="form-section">
                <Form @formSubmit="login()">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
                        <div v-for="error in v$.email.$errors" :key="error.$uid" id="emailHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <div class="button-password">
                            <input :type="btn_type == true ? 'password': 'text'" class="form-control" id="password" aria-describedby="passHelp" v-model="password">
                            <font-awesome-icon :icon="['fa', btn_type == true ? 'fa-eye-slash': 'fa-eye']" class="side-eye" @click="btn_type=!btn_type"/>
                        </div>
                        <div v-for="error in v$.password.$errors" :key="error.$uid" id="passHelp" class="form-text text-danger">*{{error.$message}}</div>
                    </div>
                    <button type="submit" class="btn btn-primary"><span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sign in</button>
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
import logo from '../../assets/logo-apps.svg'
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, helpers } from '@vuelidate/validators'
import Form from '../component_layouts/form.vue'
import router from '@/router'


export default {
    setup: () => ({ v$: useVuelidate() }),
    components: {
        Form
    },
    data(){
        return {
            email: '',
            password: '',
            title: '',
            message: '',
            alert: false,
            loading: false,
            btn_type: true,
            logo: logo
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
            const result = await this.v$.$validate()
            if(result){
                this.loading = true
                const res = await this.$store.dispatch('loginAuth', {email: this.email, password: this.password})
                if(res.status == false){
                    this.alert = true;
                    this.title = 'Error!';
                    this.message = res.message
                    this.loading = false
                }else {
                    this.loading = false
                    this.$swal.fire({
                        toast: true,
                        icon: 'success',
                        title: 'Login Succcess !',
                        showConfirmButton: false,
                        position: 'top-end',
                        timer: 2000,
                        timerProgressBar: true,
                    })
                    router.push('/dashboard');
                }
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

  .alert {
      margin: 0 2rem 0 2rem;
  }

  .button-password {
    display: flex;
    align-items: center;
    position: relative;
  }

  .side-eye {
    position: absolute;
    margin-left: auto;
    opacity: 90%;
    right: 0.75rem;
  }

  .side-eye:hover {
    cursor: pointer;
    opacity: 60%;
  }


</style>