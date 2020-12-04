<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        color="primary"
        class="mt-3 mb-3"
        v-on="on"
      >
        Add Issue
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add an Issue</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="issue_number"
                label="Issue Number*"
                prepend-icon="mdi-pound"
                type="number"
                min="0"
                required
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="purchase_price"
                label="Purchase Price"
                prepend-icon="mdi-currency-usd"
                type="number"
                min="0"
              />
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
              <v-checkbox
                v-model="is_variant"
                label="Variant Issue?"
              />
            </v-col>
            <v-col
              cols="12"
              sm="9"
            >
              <v-text-field
                v-model="variant_info"
                label="Variant Info"
                prepend-icon="mdi-lead-pencil"
              />
            </v-col>

            <v-col cols="12">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="publication_date"
                    label="Publication Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
                  type="month"
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(publication_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
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
          @click="submitIssue"
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
  name: "AddIssue",
})
export default class AddIssue extends Vue {
  dialog: boolean = false;
  issue_number: number = 1;
  purchase_price: string = "";
  is_variant = false;
  variant_info: string = "";
  publication_date = "";
  modal = false;
  date = "";

  handleImage(e: Event) {
    //@ts-ignore
    this.image = e.target.files[0];
    //this.image = this.$refs.image;
  }

  submitIssue() {
    let formData = new FormData();
    formData.append("seriesId", this.$route.params.id);
    formData.append("issue_number", this.issue_number.toString());
    formData.append("purchase_price", this.purchase_price);
    formData.append("is_variant", this.is_variant === true ? "true" : "false");
    formData.append("variant_info", this.variant_info);
    formData.append("publication_date", this.publication_date);
    formData.append("is_collected", "false");

    axios
      .post("http://localhost:8000/issue", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
          this.dialog = false;
          //this.$router.go(0);
        }
      });
  }
}
</script>
