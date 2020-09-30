<template>
  <v-app>
    <Navbar />
    <router-view></router-view>
    <v-main>
      <ActionBtn />
    </v-main>
  </v-app>
</template>

<script>
import store from "./store/index";
import ActionBtn from "@/components/ActionBtn";
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  store: store,
  components: { ActionBtn, Navbar },
};
</script>
