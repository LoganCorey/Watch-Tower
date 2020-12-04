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
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Add Publisher</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-form>
          <v-card-title>
            <span class="headline">Add a Publisher</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    prepend-icon="mdi-lead-pencil"
                    label="Publisher Name*"
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
              @click="submitPublisher"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Publishers",
  components: {
    AddPublisher,
  },
})
export default class AddPublisher extends Vue {
  dialog:boolean = false;
  name: string = "";
  //@ts-ignore
  image: Blob = null;
  

  handleImage(e: Event) {
    //@ts-ignore
    this.image = e.target.files[0];
    //this.image = this.$refs.image;
  }
  submitPublisher() {
    let formData = new FormData();
    formData.append("publisherName", this.name);
    if (this.image !== null) {
      formData.append("image", this.image);
    }

    axios
      .post("http://localhost:8000/publisher", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          this.$store.dispatch({ type: "getPublishersAsync" });
          this.dialog = false;
        } 
      });
  }
}
</script>
