<template>
  <v-app>
    <LogView></LogView>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LogView from "./LogView.vue";
import Component from "vue-class-component";

@Component({
  components: { LogView }
})
export default class App extends Vue {}
</script>

<style lang="css">
body {
  color: #56b983;
}
</style>
