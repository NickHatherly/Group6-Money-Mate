<template>
  <div id="app">
        <input type="text" v-model="text"/>
        <p></p>
        <input type="double" v-model="float"/>
        <p></p>
        <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
        </v-row>
        <p></p>
        <button @click="addtransaction ()">Save Transaction</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      float: null,
      transactions: [],
      date: null
    }
  },

  methods: {
    addtransaction () {
      this.transactions.push(this.double)
      this.float - null
      this.transactions.push(this.text)
      this.text - null
      this.transactions.push(Math.round(+new Date()/1000))
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
