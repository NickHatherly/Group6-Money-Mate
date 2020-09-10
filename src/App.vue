<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
              <template>
                <v-text-field
                label="Description"
                single-line v-model="text"></v-text-field>
                <v-text-field
                label="Amount"
                single-line v-model="double"></v-text-field>
                <v-row>
                <v-date-picker v-model="picker"></v-date-picker>
                </v-row>
                <v-btn  @click="addtransaction ()">Save Transaction</v-btn>
              </template>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    name: 'App',
    data: () => {
      return {
      double: null,
      transactions: [],
      date: null,
      picker: null,
      drawer: null
    }
    },

  methods: {
    addtransaction () {
      this.transactions.push(this.text)
      this.text - null
      this.transactions.push(this.double)
      this.double - null
      this.transactions.push(Math.round(+new Date()/1000))
      this.double - null
      this.transactions.push(this.picker)
      this.$localStorage.set('transactions' + " " + localStorage.length, JSON.stringify(this.transactions),)
      this.transactions = []
    }
  }
}
</script>