import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
      receiptData:[]
  },
  mutations: {
      addReceipt(state, transaction) {
          state.receiptData.push(transaction);
      },
  },
  actions: {},
  modules: {}
});

export default store;

