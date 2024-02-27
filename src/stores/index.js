import { createStore } from "vuex";
import axios from "axios";
import jsCookie from "js-cookie";

//vuex-store
import Products from './product.js'

const store = createStore({
    state() {
        return {
            token: '',
            user: []
        }
    },

    mutations: {
        SET_TOKEN(state, data){
            state.token = data;
        },
        SET_USER(state, data){
            state.user = data
        },
    },

    getters: {
        token(state){
            return state.token;
        },
        user(state){
            return state.user;
        },
    },

    actions: {
        async loginAuth(context, payload){
            const fd = new FormData()
            fd.append('email', payload.email)
            fd.append('password', payload.password)
            try {
                await axios.get('/sanctum/csrf-cookie')
                const res = await axios({
                    method: 'POST',
                    url: `/api/login`,
                    headers: {
                        'Accept': 'application/json'
                    },
                    data: fd
                }).then((response) => {
                    context.commit('SET_TOKEN', response.data.data.token)
                    jsCookie.set('TOKEN', response.data.data.token)
                    return response.data.data
                })

                return {
                    status: true,
                    data: res
                }

            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: error.response.data.message
                }
            }
        },

        async registerUser(context, payload){
            const fd = new FormData()
            fd.append('name', payload.name)
            fd.append('email', payload.email)
            fd.append('password', payload.password)
            fd.append('confirm_password', payload.confirmPassword)
            try {
                const res = await axios({
                    method: 'POST',
                    url: `/api/register`,
                    headers: {
                        'Accept': 'application/json'
                    },
                    data: fd
                }).then((response) => {
                    context.commit('SET_USER', response.data.data)
                    return response.data.data;
                })

                return {
                    status: true,
                    data: res
                }

            } catch (error) {
                return {
                    status: false,
                    message: error.response.data
                }
            }
        }
    },
    modules: {
        product: Products
    }
})

export default store