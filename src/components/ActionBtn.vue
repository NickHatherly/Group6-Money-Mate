<template>
  <v-speed-dial fixed bottom right>
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-plus</v-icon>
      </v-btn>
    </template>
    <!-- TEXT INPUT -->
    <!-- these buttons each link to the different pages -->
    <v-btn dark small fab color="green" to="/Textinput">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <!-- VOICE INPUT -->
    <!-- these buttons each link to the different pages -->
    <v-btn dark small fab color="indigo" to="/ REPLACE ME WITH YOUR PAGE PATH">
      <v-icon>mdi-microphone</v-icon>
    </v-btn>

    <!-- IMAGE INPUT -->
    <!-- these buttons each link to the different pages -->
    <v-btn dark small fab color="red" to="/  REPLACE ME WITH YOUR PAGE PATH">
      <v-icon>mdi-camera</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data () {
    return {
    fab: false
  }
}
}
</script>