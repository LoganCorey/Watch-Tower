<template>
  <div class="mr-3 ml-3  mb-6">
    <h2
      class="display-2 font-weight-bold"
      style="text-shadow: 2px 2px white"
    >
      Collections
    </h2>
    <h6 class="subtitle-1 ml-6">
      Check out comics you're collecting
    </h6>
    <v-divider />
    <div class="collections mt-6 mb-6">
      <collection-card
        v-for="collection in this.$store.state.collections"
        :key="collection.id"
        :series-id="collection.id"
        :title="collection.name"
        :picture="collection.issues[0].cover_path"
        :date="collection.year_began"
        :total-issues="collection.issues.length"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CollectionCard from "./CollectionCard.vue";

@Component({
  name: "Collections",
  components: {
    CollectionCard,
  },
  data: function(){
    return{
      collections: this.$store.state.collections
    }
  }
})
export default class Collections extends Vue {

}
</script>

<style scoped>
.collections {
  display: flex;
}
</style>
