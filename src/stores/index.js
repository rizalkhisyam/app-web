import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: '',
            category: []
        }
    },

    mutations: {
        setToken(state, data){
            state.token = data;
        }
    },

    getters: {
        token(state){
            return state.token;
        }
    },

    actions: {
        loginAuth(context){
            context.commit('setToken', 'token|fhadsfkjhadsfkjhasfkdjashfaks')
            return {
                status: true,
                data: {
                    token: 'token|fhadsfkjhadsfkjhasfkdjashfaks'
                }
            }
        }
    }
})

export default store