import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    transaction:[]
  },
  mutations: {
    addTransaction(state, transaction){
      state.transaction.push(transaction)
    },
  },
  actions: {},
  modules: {}
});

export default store
