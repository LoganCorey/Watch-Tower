<template>
  <v-navigation-drawer
    fixed
    permanent
    dark
    class="side-navigation"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Watch Tower Comics
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list
      dense
      nav
    >
      <v-list-item
        link
        to="/"
      >
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <AddCollection />
      <AddPublisher />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AddCollection from "../add-collection/AddCollection.vue";
import AddPublisher from "../add-publisher/AddPublisher.vue";
export default {
  components: {
    AddCollection,
    AddPublisher,
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Add Collection", icon: "mdi-image" },
        { title: "Add Publisher", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
};
</script>

<style scoped>
.side-navigation {
  max-width: 17vw;
  min-width: 230px;
}
</style>
