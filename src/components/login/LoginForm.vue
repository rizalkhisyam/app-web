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
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
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
import Form from '../component_layouts/form.vue'
export default {
    components: {
        Form
    },
    data(){
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        async login() {
            this.$swal.fire({
                toast: true,
                icon: 'success',
                title: 'Login Succcess !',
                showConfirmButton: false,
                position: 'top-end',
                timer: 2000,
                timerProgressBar: true,
            })
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