import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    transaction: []
  },
  mutations: {
    addTransaction(state, transaction) {
      state.transaction.push(transaction);
    }
  },
  actions: {},
  modules: {}
});

export default store;
