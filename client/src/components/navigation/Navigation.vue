<template>
  <v-app-bar
    app
    class="app-bar"
    dark
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.15)"
  >
    <div class="d-flex align-center">
      <router-link
        to="/"
        class="title flair ml-4"
        style="font-size: 1.8em !important; text-decoration:none!important; color:white"
      >
        Watch Tower
      </router-link>
    </div>
    <v-spacer />
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Navigation",

})
export default class Navigation extends Vue {}
</script>
