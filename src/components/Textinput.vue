<template>

    <v-form>
    <v-col>
    <v-text-field
    v-model="amount"
    label="amount"
    required
    ></v-text-field>
    </v-col>

    <v-col>
    <v-text-field
    v-model="description"
    label="description"
    required
    ></v-text-field>
    </v-col>

      <v-col cols="12" sm="6" md="4">
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
            <v-btn text color="primary" @click="$refs.date.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

    <v-btn  @click="addTransaction()">Save json</v-btn>
    </v-form>
</template>


<script>
import { store } from '@/store/index'
import {mapState} from 'vuex'

export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        store,
        description:'',
        amount:'',
    }),

    methods: {

        addTransaction() {
            var id = Math.floor(Math.random() * 1000000000000);
            this.store.commit('addTransaction', {
                id: id,
                amount: this.amount,
                date: this.date,
                name: this.description
            })
        }
    },

    computed: {
        ...mapState(['transaction'])
    }
}
</script>