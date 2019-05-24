<template>
  <section class="section">
    <div class="columns is-centered">
      <div
        class="column is-12"
        :class="{ 'is-8-desktop is-6-widescreen': !fullscreen }"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    }
  }
});
</script>
