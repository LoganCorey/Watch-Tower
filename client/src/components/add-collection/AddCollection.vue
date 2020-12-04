<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item
          v-bind="attrs"
          v-on="on"
        >
          <v-list-item-icon>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Add a Collection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add a Collection</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Series Name*"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="totalIssues"
                  label="Total Issues / Current Number of Issues*"
                  type="number"
                  min="0"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="publisher"
                  :items="this.$store.getters.getPublisherNames"
                  label="Publisher*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="yearBegan"
                  type="number"
                  label="Year Began*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="yearEnded"
                  type="number"
                  label="Year Ended?"
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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
            @click="submitCollection"
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
  name: "AddCollection",
})
export default class AddCollection extends Vue {
  name: string = "";
  totalIssues: number = 1;
  publisher = "";
  yearBegan: number = 2000;
  yearEnded: string = "";
  dialog: boolean = false;

  handleImage(e: Event) {
    //@ts-ignore
    this.image = e.target.files[0];
    //this.image = this.$refs.image;
  }

  getPublisherId(name: string) {
    let i = 0;
    while (i < this.$store.state.publishers.length) {
      if (this.$store.state.publishers[i].name === name) {
        return this.$store.state.publishers[i].id;
      }
      i++;
    }
  }
  submitCollection() {
    let formData = new FormData();
    formData.append("seriesName", this.name);
    formData.append("totalIssues", this.totalIssues.toString());
    //@ts-ignore
    const publisherIndex: number = this.getPublisherId(this.publisher);
    formData.append("publisherId", publisherIndex.toString());
    formData.append("yearBegan", this.yearBegan.toString());
    formData.append("yearEnded", this.yearEnded);

    axios
      .post("http://localhost:8000/series", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
          this.dialog = false;
        }
      });
  }
}
</script>
