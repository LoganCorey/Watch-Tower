<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        class="edit"
        small
        v-on="on"
      >
        <v-icon style="font-size: 3em !important">
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span
          class="headline"
          style="width:100%"
        >Edit Series  <v-btn
          style="float:right"
          color="red darken-1"
          text
          @click="deleteSeries"
        >
          DELETE
        </v-btn></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Name*"
                prepend-icon="mdi-lead-pencil"
                required
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="year_began"
                label="Year Began"
                prepend-icon="mdi-calendar"
                required
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="year_ended"
                label="Year Ended"
                prepend-icon="mdi-calendar"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="publisher_name"
                :items="this.$store.getters.getPublisherNames"
                label="Publisher*"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="updateSeries"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "EditSeries",
  props: {
    series: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "Lorem",
          year_began: 2000,
          year_ended: 2012,
          publisherId: 1,
        };
      },
    },
    publisher_name_initial: {
      type: String,
      default: "Lorem",
    },
  },
  data() {
    return {
      name: this.$props.series.name,
      year_began: this.$props.series.year_began,
      year_ended: this.$props.series.year_ended,
      publisherId: this.$props.series.publisherId,
      publisher_name: this.$props.publisher_name_initial,
      dialog: false,
    };
  },
  methods: {
    getPublisherIndex(name: string) {
      let i = 0;
      while (i < this.$store.state.publishers.length) {
        if (this.$store.state.publishers[i].name === name) {
          return i;
        }
      }
    },
    async updateSeries() {
      let formData: FormData = new FormData();
      formData.append("name", this.$data.name);
      formData.append("year_began", this.$data.year_began);
      formData.append("year_ended", this.$data.year_ended);
      formData.append(
        "publisherId",
        this.$store.getters.getPublisherIdByName(this.$data.publisher_name)
      );

      axios
        .patch(
          `http://localhost:8000/series/${this.$route.params.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(async (response: AxiosResponse) => {
          if (response.status === 200) {
            await this.$store.dispatch({ type: "getCollectionsAsync" });
            this.$data.dialog = false;
          }
        })
        .finally(() => {
          //
        });
    },
  },
})
export default class EditSeries extends Vue {
  submitCollection() {
    let formData = new FormData();
    //formData.append("seriesName", this.name);
    //formData.append("totalIssues", this.totalIssues.toString());

    axios
      .post("http://localhost:8000/series", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
          //  this.dialog = false;
          this.$router.go(0);
        }
      });
  }
    deleteSeries() {
    axios
      .delete(`http://localhost:8000/series/${this.$props.series.id}`)
      .then((response: AxiosResponse) => {
        if (response.status === 204) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
         // this.$data.dialog = false;
          this.$router.go(-1)
        }
      });
  }
}
</script>
<style scoped>
.edit {
  display: inline-block;
  margin-right: 0px;
}
</style>
