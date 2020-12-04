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
        class="mt-3 mb-3"
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
        >Edit an Issue
          <v-btn
            style="float:right"
            color="red darken-1"
            text
            @click="deleteIssue"
          >
            DELETE
          </v-btn></span>
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
  name: "EditIssue",
  props: {
    issue: {
      type: Object,
      default: () => {
        return {
          id: 0,
          seriesId: 0,
          issue_number: 1,
          is_collected: false,
          is_variant: false,
          variant_info: null,
          cover_path: "",
        };
      },
    },
  },
})
export default class EditIssue extends Vue {
  issue_number: number = this.$props.issue.issue_number;
  purchase_price: string = "";
  is_variant = false;
  variant_info: string = "";
  dialog: boolean = false;

  getPublisherIndex(name: string) {
    let i = 0;
    while (i < this.$store.state.publishers.length) {
      if (this.$store.state.publishers[i].name === name) {
        return i;
      }
    }
  }
  submitIssue() {
    let formData = new FormData();
    formData.append("issue_number", this.issue_number.toString());
    formData.append("is_variant", this.is_variant === true ? "true" : "false");
    formData.append("variant_info", this.variant_info);
    formData.append("purchase_price", this.purchase_price);

    axios
      .patch(`http://localhost:8000/issue/${this.$props.issue.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
          this.dialog = false;
        }
      });
  }

  deleteIssue() {
    axios
      .delete(`http://localhost:8000/issue/${this.$props.issue.id}`)
      .then((response: AxiosResponse) => {
        if (response.status === 204) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
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
