<template>
  <v-container>
    <v-row>
      <v-form v-model="isValid" cols="60" md="6">
        <v-col>
          <v-text-field
            v-model="amount"
            label="Amount"
            :rules="[v => !!v || 'Please Enter an Amount']"
            required
          ></v-text-field>
        </v-col>
      </v-form>
      <v-col cols="10" md="6"></v-col>

      <v-col cols="10" md="6">
        <v-text-field v-model="description" label="Description"></v-text-field>
      </v-col>

      <v-col cols="10" md="6" lg="2">
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
            <v-text-field v-model="date" label="Date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.date.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col offset-md="1">
        <v-btn :disabled="!isValid" @click="addTransaction()">Save json</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { store } from "@/store/index";
import { mapState } from "vuex";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    store,
    description: null,
    amount: null,
    isValid: true,
  }),

  methods: {
    addTransaction() {
      var id = Math.floor(Math.random() * 1000000000000);
      this.store.commit("addTransaction", {
        id: id,
        amount: this.amount,
        date: this.date,
        name: this.description,
      });
    },
  },

  computed: {
    ...mapState(["transaction"]),
  },
};
</script>