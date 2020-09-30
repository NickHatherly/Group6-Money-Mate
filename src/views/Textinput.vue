<template>
  <v-form v-model="isValid" cols="60" md="6">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="amount"
            label="Amount"
            type="number"
            :rules="[(v) => !!v || 'Please Enter an Amount']"
            prepend-icon="mdi-currency-usd"
            required
          ></v-text-field>
        </v-col>
        <v-col>
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
                prepend-icon="mdi-calendar"
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
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="title"
            label="Description"
            prepend-icon="mdi-book-open"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-select
            v-model="inCategory"
            :items="category"
            label="Category"
            prepend-icon="mdi-folder-open"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="type"
            :items="transType"
            label="Transaction Type"
            prepend-icon="mdi-label"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="company"
            label="Company"
            prepend-icon="mdi-office-building"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="type"
            :items="recurringType"
            label="Recurring?"
            prepend-icon="mdi-ticket"
          ></v-select>
        </v-col>
        <v-col class="pa-2">
          <v-btn
            :disabled="!isValid"
            color="#1565c0"
            dark
            @click="addTransaction()"
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
    recurringType: ["Yes", "No"],
    transType: ["Expense", "Income"],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    store,
    description: null,
    amount: null,
    isValid: true,
    company: null,
  }),
  created() {
    this.amount = this.$route.query.transactions[0];
    this.date = this.$route.query.transactions[1];
    this.title = this.$route.query.transactions[2];
    this.company = this.$route.query.transactions[3];
  },

  methods: {
    addTransaction() {
      var id = Math.floor(Date.now() / 1000);
      this.store.commit("addTransaction", {
        id: id,
        type: this.Type,
        amount: this.amount,
        date: this.date,
        title: this.title,
        category: this.inCategory,
        company: this.company,
      });
    },
  },

  computed: {
    ...mapState(["transaction", "category"]),
  },
};
</script>