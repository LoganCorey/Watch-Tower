<template>
  <div class="home">
    <Collections />
    <Publishers />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Collections from '@/components/Collections/Collections.vue';
import Publishers from '@/components/Publishers/Publishers.vue';
@Component({
  components: {
    Collections,
    Publishers,
  },
})
export default class Home extends Vue {}
</script>
