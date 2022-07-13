<template>
  <section
    :class="[
      'text-center',
      'flex',
      'items-center',
      'justify-center',
      'doc-section',
    ]"
    :style="{
    }"
    >

    <h1 class="bg-secondary" style="line-height: 8rem">
      &nbsp;{{ title }}&nbsp;
    </h1>

    <br/>

    <h2>{{ description }}</h2>
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
  name: 'Hero',
  props: {
    title: String,
    label: String,
    description: String,
    smallTextWithLink: String,
  },
  setup () {
    return {
    }
  }
});
</script>
