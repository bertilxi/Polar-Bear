<template>
  <Page>
    <div class>
      <h4 class="title is-5">Email</h4>
      <a
        href="mailto:Indumentariapolarbear@gmail.com"
        target="_blank"
        class="button is-text"
        >Indumentariapolarbear@gmail.com</a
      >
      <hr />
      <h4 class="title is-5">Telefono</h4>
      <a href="tel:+5493425961233" target="_blank" class="button is-text"
        >342 5961233</a
      >
      <hr />
      <br />

      <!-- <h4 class="title is-5">Contactanos</h4>
          <form @submit.prevent="handleSubmit">
            <div class="field">
              <label class="label">Tu Nombre</label>
              <div class="control">
                <input
                  v-model="name"
                  v-validate="'required'"
                  type="text"
                  :class="{ input: true, 'is-danger': errors.has('name') }"
                  name="name"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Tu Email</label>
              <div class="control">
                <input
                  v-model="email"
                  v-validate="'required|email'"
                  :class="{ input: true, 'is-danger': errors.has('email') }"
                  name="email"
                  type="text"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Mensaje</label>
              <div class="control">
                <textarea
                  v-model="message"
                  v-validate="'required'"
                  maxlength="400"
                  rows="6"
                  :class="{
                    textarea: true,
                    'is-danger': errors.has('message')
                  }"
                  name="message"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Cuanto es 2 + 2 ?</label>
              <div class="control">
                <input
                  v-model="verify"
                  v-validate="{ required: true, is: '4' }"
                  :class="{ input: true, 'is-danger': errors.has('verify') }"
                  name="verify"
                />
              </div>
            </div>

            <button class="button is-primary is-fullwidth" type="submit">
              Enviar
            </button>
          </form> -->
    </div>
  </Page>
</template>

<script lang="ts">
import Vue from "vue";
import Page from "@/components/Page.vue";

export default Vue.extend({
  components: { Page },
  data() {
    return {
      name: "",
      email: "",
      message: "",
      verify: undefined
    };
  },
  methods: {
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          alert("Form Submitted!");
          return;
        }
      });
    }
  }
});
</script>
