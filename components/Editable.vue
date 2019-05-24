<template>
  <p ref="editable" class="input" contenteditable v-on="listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "\xa0"
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    }
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.innerText.trim());
    }
  }
};
</script>
