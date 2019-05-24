<template>
  <Page>
    Perfil
  </Page>
</template>

<script lang="ts">
import Vue from "vue";
import Page from "@/components/Page.vue";

export default Vue.extend({
  middleware: "auth",
  components: { Page }
});
</script>
