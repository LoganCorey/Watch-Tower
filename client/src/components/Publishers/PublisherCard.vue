<template>
  <div class="root">
    <v-card
      class="publisher-card ml-4 mr-4  mb-4 mt-4"
      elevation="3"
      width="200"
      height="200"
    >
      <v-img
        :src="image"
        contain
        height="200"
      />

      <h4 class="subtitle-1 font-weight-bold mt-3 ml-3">
        Publisher
      </h4>
      <h3
        class="font-weight-bold"
        style="display:inline-block;"
      >
        <EditPublisher :publisher="publisher" />{{ name }}
      </h3>
    </v-card>
  </div>
</template>

<script lang="ts">
import EditPublisher from "@/components/edit-publisher/EditPublisher.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "PublisherCard",
  components: {
    EditPublisher,
  },
  props: {
    publisher: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "Lorem Ipsum",
          publisher_image: "image",
        };
      },
    },
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
})
export default class PublisherCard extends Vue {}
</script>

<style scoped>
.root {
  height: 300px;
}
.publisher-card {
  cursor: pointer;
}
.publisher {
  padding: 0px !important;
}
.content {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
