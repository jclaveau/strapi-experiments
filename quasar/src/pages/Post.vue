<template>
  <q-page
    class="
      with-doc-margins
      app-page
    "
    >

    <section
      v-if="contentLoading"
      :class="[
        'text-center',
        'flex',
        'items-center',
        'justify-center',
        'doc-section',
      ]"
      >
        <q-circular-progress
          size="lg"
          indeterminate
          color="primary"
          class="q-ma-md"
        />
    </section>
    <template v-else>

      <!-- contentData: <pre>{{ JSON.stringify(contentData, null, 2) }}</pre> -->
      <ArticleSection
        :title="contentData.data.attributes.title"
        :content="contentData.data.attributes.content"
        :published_on="contentData.data.attributes.publishedAt"
      ></ArticleSection>

    </template>

  </q-page>
</template>

<style lang="scss">
.app-page {
  padding-top: 20px;
}
</style>

<script>
import {
  defineComponent,
  // ref,
  // onMounted,
  watchEffect,
  toRaw,
} from 'vue';
import { useAxios } from '@vue-composable/axios'
import { useRoute } from 'vue-router';
import { pascalCase } from "change-case";

import ArticleSection from '../components/Sections/ArticleSection.vue';

/* eslint vue/multi-word-component-names: 0 */
export default defineComponent({
  name: 'Post',
  components: {
    ArticleSection,
  },
  setup () {

    const {
      data:    contentData,
      loading: contentLoading,
      exec:    contentExec,
      status:  contentStatus,
    } = useAxios()


    const route = useRoute();
    // console.log('Post.vue routeMeta', toRaw(route.meta))
    let unwatch = watchEffect( () => {
      contentExec({
        method: 'GET',
        url: `/bo/api/posts/${route.meta.post.id}?populate=deep`,
      })
      .then(() => unwatch() )
    })


    return {
      lorem: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      `,
      contentData,
      contentLoading,
      contentExec,
      contentStatus,

      pascalCase,
    }
  }
});
</script>
