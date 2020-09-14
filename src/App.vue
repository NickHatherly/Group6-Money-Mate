<template>
  <v-app id="inspire">

    <!-- this is the code for the app menu on the left side -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <!-- each of these blocks of code is for an individual item in the menu -->
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
            <v-icon>mdi-camera</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Image input</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-microphone</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Voice Input</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  <!-- colouring for the bar across the top -->
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- the contrainer that the main body is contained -->
      <v-container
        class=""
        fluid
      >

          <v-col class="text-center">
              <template>
                <v-text-field
                label="Amount"
                single-line v-model="amount"></v-text-field>
                <v-text-field
                label="Description"
                single-line v-model="description"></v-text-field>
                <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-btn  @click="addtransaction ()">Save Transaction</v-btn>
                <v-btn  @click="addjson ()">Save json</v-btn>
              </template>
          </v-col>
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
      arr: [],
      transactions: [],
      date: null,
      picker: null,
      drawer: null
    }
    },

  methods: {
    // addtransaction () {
    //   this.transactions.push(this.description)
    //   this.transactions.push(this.amount)
    //   this.transactions.push(Math.round(+new Date()/1000))
    //   this.transactions.push(this.date)
    //   console.log(JSON.stringify(this.transactions))
    //   this.$localStorage.set('transactions' + " " + localStorage.length, JSON.stringify(this.transactions),)
    //   this.transactions = []
    // },

    addjson () {
      this.arr.push(Math.round(+new Date()/1000) + ", " + this.amount + ", " + this.date + ", " + this.description)
      var myJSON = JSON.stringify(this.arr)
      console.log(myJSON)
      this.$localStorage.set('transaction', myJSON)
    }
  }
}
</script>