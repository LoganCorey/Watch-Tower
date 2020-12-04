<template>
  <div class="mr-3 ml-3 mb-6">
    <v-card
      class="mx-auto comic"
      :class="issue.is_collected === false ? 'transparent' : ''"
      width="200"
      height="300"
      elevation="8"
      link
      @drop.prevent="uploadComicImage"
      @dragover.prevent
    >
      <v-img
        v-if="coverPath !== null"
        height="300px"
        :src="'assets://' + coverPath"
      />
      <v-img
        v-if="coverPath === null"
        height="300px"
      />
    </v-card>
    <h4
      class="comic-title font-weight-black mt-3"
      style="display:flex; align-items:center;"
    >
      <EditIssue :issue="issue" /> {{ seriesTitle }} #{{ issue.issue_number }}
      <v-btn
        v-if="issue.is_collected === false"
        icon
        color="green"
        class="ml-3"
        style="background-color:transparent"
      >
        <v-icon @click="changeCollectionStatus">
          mdi-check-bold
        </v-icon>
      </v-btn>
      <v-btn
        v-if="issue.is_collected === true"
        icon
        color="red"
        style="background-color:transparent"
      >
        <v-icon @click="changeCollectionStatus">
          mdi-close-thick
        </v-icon>
      </v-btn>
    </h4>
    <h5
      v-if="issue.variant_info"
      class="variant-info ml-2"
    >
      Variant Info: {{ issue.variant_info }}
    </h5>
    <h5
      v-if="issue.purchase_price !== null"
      class="comic-title ml-2"
    >
      Purchase Price:  ${{ issue.purchase_price }}
    </h5>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import EditIssue from "@/components/edit-issue/EditIssue.vue";

@Component({
  name: "IssueComicCard",
  components: {
    EditIssue,
  },
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
          purchase_price: 0,
          cover_path: "",
        };
      },
    },
    seriesTitle: {
      type: String,
      default: "Lorem",
    },
  },
  data: function() {
    return {
      cover_path: this.$props.issue.cover_path,
    };
  },
  watch: {
    issue: {
      handler: () => {},
      deep: true,
    },
  },
})
export default class IssueComicCard extends Vue {
  get coverPath() {
    return this.$store.getters.getIssueById(
      this.$props.issue.seriesId,
      this.$props.issue.id
    ).cover_path;
  }

  uploadComicImage = (e: Event) => {
    //@ts-ignore
    let droppedFiles = e.dataTransfer.files;
    if (!droppedFiles) return;
    let formData = new FormData();
    formData.append("issueId", this.$props.issue.id);
    formData.append("image", droppedFiles[0]);
    axios
      .patch(`http://localhost:8000/issue/${this.$props.issue.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          this.$store.dispatch({ type: "getCollectionsAsync" });
          this.$data.cover_path = this.$store.getters.getIssueById(
            this.$props.issue.seriesId,
            this.$props.issue.id
          ).cover_path;
        }
      });
  };

  changeCollectionStatus() {
    let formData = new FormData();
    // flip is_collected status
    formData.append("is_collected", this.$props.issue.is_collected === false? "true": "false");

    axios
      .patch(`http://localhost:8000/issue/${this.$props.issue.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
          this.$store.dispatch({ type: "getCollectionsAsync" });
      });
  }
}
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
.comic-link {
  color: inherit;
  text-decoration: none;
  line-height: normal;
  letter-spacing: 0.0892857143em;
  font-size: 0.85em;
}
.transparent {
  opacity: 0.6;
}
</style>
