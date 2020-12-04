<template>
  <v-container>
    <h2
      class="display-2 font-weight-bold"
      style="text-shadow: 2px 2px white"
    >
      <EditSeries
        :series="series"
        :publisher_name_initial="series.publisher.name"
      /> {{ series.name }}
      <h6
        style="display: inline-block"
        class="subtitle-1"
      >
        {{
          `${series.year_began !== null ? series.year_began : "unknown"} - ${
            series.year_ended !== null ? series.year_ended : "unknown"
          }`
        }}
      </h6>
    </h2>
    <AddIssue />
    <h3 class="mt-2 mb-2">
      Collection Status ({{ collectedCount }}/{{ series.issues.length }})
    </h3>

    <div
      v-if="series.issues"
      class="issues mb-12"
    >
      <IssueComicCard
        v-for="issue in series.issues"
        
        :key="issue.id"
        :issue="issue"
        :series-title="series.name"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
import EditSeries from "@/components/edit-series/EditSeries.vue";
import AddIssue from "@/components/add-issue/AddIssue.vue";
import IssueComicCard from "@/components/IssueComicCard/IssueComicCard.vue";

@Component({
  components: {
    IssueComicCard,
    AddIssue,
    EditSeries,
  },
  
})
export default class Series extends Vue {
  //series: SeriesInterface | null = this.$store.getters.getSeriesById(
   //     parseInt(this.$route.params.id)
    //  ); ;
  unCollectedText = "Add Series To Collection";
  collectedText = "Remove Series From Collection";
  collectedCount = this.$store.getters.getCollectedIssues(
    parseInt(this.$route.params.id)
  );

  get series(){
    return this.$store.getters.getSeriesById(
        parseInt(this.$route.params.id)
      ); 
  }
  @Watch('series')
  onPropertyChanged() {
     this.collectedCount = this.$store.getters.getCollectedIssues(
    parseInt(this.$route.params.id)
  );
  }

  addSeriesToCollection() {
    axios.post(
      "http://localhost:8000/collection/series",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: { seriesId: this.$route.params.id },
      }
    );
  }

  removeSeriesFromCollection() {
    axios.delete("http://localhost:8000/collection/series", {
      params: { seriesId: this.$route.params.id },
    });
  }

  addIssueToCollection(issueId: Number) {
    axios.post(
      "http://localhost:8000/collection/issue",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: { seriesId: this.$route.params.id, issueId: issueId },
      }
    );
  }

  removeIssueFromCollection(issueId: number) {
    axios.delete("http://localhost:8000/collection/issue", {
      params: { seriesId: this.$route.params.id, issueId },
    });
  }


}
</script>

<style scoped>
.issues {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2%;
}
</style>
