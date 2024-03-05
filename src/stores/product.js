import axios from "axios";
import jsCookie from "js-cookie";
import QueryString from "qs";

const store = {
    state() {
        return {
            products: [],
            categories: [],
            new_product: []
        }
    },

    mutations: {
        SET_PRODUCTS(state, data){
            state.products = data
        },

        SET_NEW_PRODUCTS(state, data){
            state.new_product = data
        },

        SET_CATEGORIES(state, data){
            state.categories = data
        }
    },

    getters: {
        products(state){
            return state.products
        },

        new_products(state){
            return state.new_products
        },

        categories(state){
            return state.categories
        }
    },

    actions: {
        async getDataProducts(context, payload){
            try {
                const token = jsCookie.get('TOKEN')
                const res = await axios({
                    method: "GET",
                    url: `/api/products?limit=${payload.limit}&offset=${payload.offset}&order=${payload.order}&short&search=${payload.search}`,
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

        async addDataProduct(context, payload){
            try {
                const data = new FormData();
                data.append('name', payload.name);
                data.append('total', payload.total);
                data.append('category_id', payload.category_id);
                data.append('price', payload.price);
                const token = jsCookie.get('TOKEN')
                const res = await axios({
                    method: 'POST',
                    url: `/api/products`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    data: data
                }).then((response) => {
                    context.commit('SET_NEW_PRODUCTS', response.data.data)
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

        async deleteDataProduct(context, payload){
            try {
                const data = QueryString.stringify({
                    id: payload
                })
                const token = jsCookie.get('TOKEN')
                const res = await axios({
                    method: 'DELETE',
                    url: `/api/products`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data
                }).then((response) => {
                    return response.data
                })

                return {
                    status: true,
                    data: res
                }

            } catch (error) {
                console.log({
                    code: error.code,
                    message: error.message
                });
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