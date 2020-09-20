<template>
  <v-app>
    <v-main>
      <Textinput />
    </v-main>
  </v-app>
</template>

<script>
import Textinput from "./components/Textinput";
import store from "./store/index";

export default {
  name: "App",
  store: store,
  components: { Textinput }
};
</script>
