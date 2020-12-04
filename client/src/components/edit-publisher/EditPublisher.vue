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
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span
          class="headline"
          style="width:100%"
        >Edit Publisher
          <v-btn
            style="float:right"
            color="red darken-1"
            text
            @click="deletePublisher"
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
                label="Publisher Name"
                prepend-icon="mdi-lead-pencil"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="image"
                accept="image/*"
                label="Image*"
                required
                value=""
                @change="handleImage"
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
          @click="submitPublisher"
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
  name: "EditPublisher",
  props: {
    publisher: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "Lorem Ipsum",
          publisher_image: "some path",
        };
      },
    },
  },
})
export default class EditPublisher extends Vue {
  dialog: boolean = false;
  name: string = this.$props.publisher.name;
  image: string = this.$props.publisher.publisher_image;

  getPublisherIndex(name: string) {
    let i = 0;
    while (i < this.$store.state.publishers.length) {
      if (this.$store.state.publishers[i].name === name) {
        return i;
      }
    }
  }
  handleImage(e: Event) {
    //@ts-ignore
    this.image = e.target.files[0];
    //this.image = this.$refs.image;
  }
  submitPublisher() {
    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("image", this.image);
    axios
      .patch(`http://localhost:8000/publisher/${this.$props.publisher.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          this.$store.dispatch({ type: "getPublishersAsync" });
          this.dialog = false;
        }
      });
  }

  deletePublisher() {
    axios
      .delete(`http://localhost:8000/publisher/${this.$props.publisher.id}`)
      .then((response: AxiosResponse) => {
        if (response.status === 204) {
          this.$store.dispatch({ type: "getPublishersAsync" });
          this.dialog = false;
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
