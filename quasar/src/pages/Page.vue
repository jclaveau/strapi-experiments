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

      <template v-for="section, index of contentData.data.attributes.sections" :key="index">
        <!-- section: <pre>{{ JSON.stringify(section, null, 2) }}</pre> -->

        <!-- <pre>{{
          JSON.stringify(pascalCase(section.__component.split('.')[1]), null, 2)
        }}</pre> -->

        <component
          :is="pascalCase(section.__component.split('.')[1]).replace(/(Section)?$/, 'Section')"
          class="q-my-lg"
          v-bind="section"
        >

        </component>

      </template>

      <!-- contentData: <pre>{{ JSON.stringify(contentData, null, 2) }}</pre> -->

    </template>

  </q-page>
</template>

<style lang="scss">
</style>

<script>
import {
  defineComponent,
  // ref,
  watchEffect,
  toRaw,
} from 'vue';
import { useAxios } from '@vue-composable/axios'
import { useRoute } from 'vue-router';
import { pascalCase } from "change-case";

import HeroSection from '../components/Sections/HeroSection.vue';
import RichTextSection from '../components/Sections/RichTextSection.vue';
import ArticleSection from '../components/Sections/ArticleSection.vue';
import OffersSection from '../components/Sections/OffersSection.vue';
import NewsCarrouselSection from '../components/Sections/NewsCarrouselSection.vue';

/* eslint vue/multi-word-component-names: 0 */
export default defineComponent({
  name: 'Page',
  components: {
    HeroSection,
    RichTextSection,
    ArticleSection,
    OffersSection,
    NewsCarrouselSection,
  },
  setup () {

    const {
      data:    contentData,
      loading: contentLoading,
      exec:    contentExec,
      status:  contentStatus,
    } = useAxios()

    const route = useRoute();
    let unwatch = watchEffect( () => {
      // console.log('Page: route', toRaw(route.meta))
      if ('page' in route.meta) {
        const pageId = route.meta.page.related.id
        contentExec({
          method: 'GET',
          url: `/bo/api/pages/${pageId}?populate=deep`,
        })
      }
    })

    return {
      contentData,
      contentLoading,
      contentExec,
      contentStatus,

      pascalCase,
    }
  }
});
</script>
