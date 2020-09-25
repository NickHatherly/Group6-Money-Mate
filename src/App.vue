<template>
  <div id="app">
    <router-view />
    <ActionButton></ActionButton>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionBtn";
export default {
  name: "App",
  components: {
    ActionButton
  }
};
</script>
<style></style>
