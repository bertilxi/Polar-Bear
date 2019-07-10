<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item brand no-underline">
        <img
          class="brand-logo"
          src="~/static/icon.png"
          width="30"
          alt="logo"
        />PolarBear
      </nuxt-link>
      <a
        href="https://www.facebook.com/PolarBearSF"
        target="_blank"
        class="navbar-item btn-icon"
        title="Facebook"
      >
        <b-icon icon="facebook-box" size="is-small" />
      </a>
      <a
        href="https://www.instagram.com/PolarBearSF"
        target="_blank"
        class="navbar-item btn-icon"
        title="Instagram"
      >
        <b-icon icon="instagram" size="is-small" />
      </a>

      <div v-if="false" class="navbar-item">
        <b-switch
          v-model="mode"
          :type="mode === 'night' ? 'is-info' : undefined"
          size="is-medium"
          true-value="night"
          false-value="day"
          @input="handleModeChange"
        >
          <b-icon
            :icon="mode === 'night' ? 'weather-night' : 'weather-sunny'"
            size="is-small"
          />
        </b-switch>
      </div>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': mobileMenu }">
      <div class="navbar-end">
        <nuxt-link to="/contact" class="navbar-item">Contacto</nuxt-link>
        <nuxt-link to="/about" class="navbar-item">Nosotros</nuxt-link>
        <Auth />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import Auth from "@/components/Auth.vue";

export default Vue.extend({
  components: { Auth },
  data() {
    return {
      mode: "",
      mobileMenu: false
    };
  },
  mounted() {
    this.mode = localStorage.getItem("mode") || "day";
    document.body.className = this.mode;
  },
  methods: {
    handleModeChange(mode) {
      localStorage.setItem("mode", mode);
      document.body.className = mode;
    },
    toggleMenu() {
      this.mobileMenu = !this.mobileMenu;
    }
  }
});
</script>

<style lang="scss">
.app-navbar {
  padding: 1rem;
}

.brand,
a.brand.is-active {
  color: #000;
  font-size: 20px;
  font-weight: 700;
}
.brand-logo {
  margin: 0 0.3rem;
}
.btn-icon {
  font-size: 1.5rem;
}
</style>
