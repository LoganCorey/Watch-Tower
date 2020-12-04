<template>
  <v-app>
    <Navigation />
    <SideNavigation />
    <v-main>
      <v-container
        fluid
        style="margin-left:250px; margin-top:40px;"
        class="container"
      >
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import Navigation from "./components/navigation/Navigation.vue";
import SideNavigation from './components/side-navigation/SideNavigation.vue';

export default Vue.extend({
  name: "App",
  components: {
    Navigation,
    SideNavigation,
  },

  data: () => ({
    //
  }),

  async created(){
    await this.$store.dispatch({ type: 'getCollectionsAsync'});
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
.container{
  width:77vw;
}
</style>