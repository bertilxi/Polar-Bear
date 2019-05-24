<template>
  <div class="layout">
    <Toolbar />
    <section class="main-section">
      <nuxt />
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/Toolbar.vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
  components: { Toolbar, Footer }
});
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-section {
  flex: 1 0;
}
</style>
