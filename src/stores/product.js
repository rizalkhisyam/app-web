import axios from "axios";
import jsCookie from "js-cookie";

const store = {
    state() {
        return {
            products: [],
            categories: [],
        }
    },

    mutations: {
        SET_PRODUCTS(state, data){
            state.products = data
        },

        SET_CATEGORIES(state, data){
            state.categories = data
        }
    },

    getters: {
        products(state){
            return state.products
        },

        categories(state){
            return state.categories
        }
    },

    actions: {
        async getDataProducts(context){
            try {
                const token = jsCookie.get('TOKEN')
                const res = await axios({
                    method: "GET",
                    url: `/api/products`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }).then((response) => {
                    context.commit('SET_PRODUCTS', response.data.data)
                    return response.data
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

        async getDataCategories(context){
            try {
                const token = jsCookie.get('TOKEN')
                const res = await axios({
                    method: "GET",
                    url: `/api/category`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }).then((response) => {
                    context.commit('SET_CATEGORIES', response.data.data)
                    return response.data
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
        }
    }
}

export default store