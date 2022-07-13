<template>
  <section
    :class="[
      'doc-section',
    ]"
    :style="{
      // border: '1px solid #000',
    }"
    v-html="content"
    >

  </section>
</template>

<style lang="scss">
</style>

<script>
import {
  defineComponent,
  // ref
} from 'vue';

export default defineComponent({
  name: 'RichTextSection',
  props: {
    content: String,
  },
  setup () {
    return {
    }
  }
});
</script>
