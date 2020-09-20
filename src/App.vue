<template>
  <v-app>
    <router-view></router-view>
    <v-main>
      <ActionBtn />
    </v-main>
  </v-app>
</template>

<script>
import store from "./store/index";
import ActionBtn from '@/components/ActionBtn';

export default {
  name: "App",
  store: store,
  components: {ActionBtn}
};
</script>
