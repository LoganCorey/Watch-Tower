<template>
  <div class="mr-3 ml-3">
    <router-link
      :to="'/series/'+seriesId"
      style="text-decoration:none; color:inherit;"
    >
      <v-card
        class="mx-auto comic"
        width="200"
        height="300"
        elevation="8"
        link
        :to="'/series/' +seriesId"
      >
        <v-img
          v-if="picture !== null"
          height="300px" 
          :src="'assets://' + picture"
        />
        <v-img
          v-if="picture === null"
          height="300px" 
        />
      </v-card>

      <h4 class="comic-title font-weight-black mt-3">
        {{ title }} ({{ this.$store.getters.getCollectedIssues(seriesId) }} / {{ totalIssues }})
      </h4>
      <h5 class="comic-title">
        {{ date }}
      </h5>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CollectionCard",
  props: {
    picture: {
      type: String,
      default: "",
    },
    series: {
      type: String,
      default: "",
    },
    seriesId:{
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: "",
    },
      date: {
      type: Number,
      default: 0,
    },
    totalIssues:{
      type:Number,
      default: 0,
    },
  }
});
</script>

<style scoped>
.comic {
  word-wrap: break-word;
}
.comic-title {
  width: 200px;
  max-width: 200px;
  word-wrap: break-word;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.comic-link{
  color:inherit;
  text-decoration:none;
  line-height:normal;
  letter-spacing:0.0892857143em;
  font-size:0.85em;
}
</style>
