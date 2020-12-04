<template>
  <div class="mr-3 ml-3  mb-12">
    <h3
      class="display-2 font-weight-bold"
      style="text-shadow: 2px 2px white"
    >
      Publishers
    </h3>
    <h6 class="subtitle-1 ml-6">
      Publishers added to your Watch Tower
    </h6>
    <v-divider />
    <div class="publishers">
      <publisher-card
        v-for="publisher in this.$store.state.publishers"
        :key="publisher.id"
        :publisher="publisher"
        :name="publisher.name"
        :image="'assets://' + publisher.publisher_image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PublisherCard from "./PublisherCard.vue";

@Component({
  name: "Publishers",
  components: {
    PublisherCard,
  },
})
export default class Publishers extends Vue {
  mounted() {
    this.$store.dispatch({ type: "getPublishersAsync" });
  }
}
</script>

<style scoped>
.publishers {
  display: flex;
  flex-wrap: wrap;
  min-width: 300px;
  flex-direction: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
