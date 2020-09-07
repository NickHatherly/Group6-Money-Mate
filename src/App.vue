<template>
  <div id="app">
    <input type="float" v-model="float"/>
    <p></p>
    <input type="text" v-model="text"/>
    <p></p>
    <button @click="addtransaction ()">Save Transaction</button>
    <ul>
      <li v-for="transaction in transactions"
      v-bind:key="transaction"
      >
        {{transaction}}
      </li>
    </ul>
  </div>
</template>

<script>
// var id = 1;
export default {
  name: 'App',
  data () {
    return {
      float: null,
      transactions: []
    }
  },

  methods: {
    addtransaction () {
      this.transactions.push(this.float)
      this.float - null
      this.transactions.push(this.text)
      this.text - null
      this.$localStorage.set('transactions' + " " + localStorage.length, JSON.stringify(this.transactions),)
      this.transactions = []
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  float-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
