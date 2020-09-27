<template>
  <v-form v-model="isValid" cols="60" md="6">
    <v-container>
      <v-row>
        <v-col cols="10" md="6">
          <v-text-field
            v-model="amount"
            label="Amount"
            :rules="[(v) => !!v || 'Please Enter an Amount']"
            required
          ></v-text-field>

          <v-text-field v-model="title" label="Description"></v-text-field>
        </v-col>

        <v-col cols="10" md="6">
          <v-menu
            ref="date"
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
              <v-btn text color="primary" @click="$refs.date.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>

          <v-overflow-btn
            v-model="category"
            class="my-2"
            :items="dropdown_category"
            label="Category"
            target="#dropdown-example"
          ></v-overflow-btn>

          <v-btn :disabled="!isValid" @click="addTransaction()"
            >Save transaction</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { store } from "@/store/index";
import { mapState } from "vuex";

export default {
  data: () => ({
    dropdown_category: [
      "Bills",
      "Entertainment",
      "Food",
      "Groceries",
      "Health",
      "Shopping",
      "Transport",
      "Utilities",
      "Other",
    ],

    date: new Date().toISOString().substr(0, 10),
    menu: false,
    store,
    description: null,
    amount: null,
    isValid: true,
    category: null,
  }),
  created() {
    this.amount = this.$route.query.transactions[3];
    this.date = this.$route.query.transactions[1];
    this.title = this.$route.query.transactions[2];
  },

  methods: {
    addTransaction() {
      var id = Math.floor(Math.random() * 1000000000000);
      this.store.commit("addTransaction", {
        id: id,
        amount: this.amount,
        date: this.date,
        title: this.title,
        category: this.category,
      });
    },
  },

  computed: {
    ...mapState(["transaction"]),
  },
};
</script>


this.$store.state.transction.whatever you want