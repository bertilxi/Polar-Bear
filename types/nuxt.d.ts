import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $nuxt: any;
    $dialog?: any;
    $toast?: any;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    middleware?: string;
  }
}
