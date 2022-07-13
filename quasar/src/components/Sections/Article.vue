<template>
  <section
    :class="[
      'doc-section',
      'section-article',
      'q-pa-md',
      'rounded-borders',
      'shadow-1',
    ]"
    :style="{
      backgroundColor: '#fff',
    }"
    >

    <article>
      <header>
        <h2>{{ title }}</h2>
        <div class="byline">
          <address class="author">
            By <a rel="author" href="/author/john-doe">John Doe</a>
          </address>
          on
          <time pubdate
            datetime="{{ published_on }}"
            title="{{ published_on }}">
            {{ published_on }}
          </time>
        </div>
      </header>

      <section v-html="content" class="article-content"></section>
    </article>

  </section>
</template>

<style lang="scss">
.section-article {

}
</style>

<script>
import {
  defineComponent,
  // ref
} from 'vue';

export default defineComponent({
  name: 'Article',
  props: {
    title: String,
    content: String,
    published_on: String,
  },
  setup () {
    return {
    }
  }
});
</script>
