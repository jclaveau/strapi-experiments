<template>
  <q-page
    class="with-doc-margins app-page"
    >

    <p v-if="contentLoading">
      loading...
    </p>
    <template v-else>
      <!-- contentData: <pre>{{ JSON.stringify(contentData, null, 2) }}</pre> -->

      <template v-for="section, index of contentData.data.attributes.sections" :key="index">
        <!-- section: <pre>{{ JSON.stringify(section, null, 2) }}</pre> -->
        <!-- <pre>{{
          JSON.stringify(pascalCase(section.__component.split('.')[1]), null, 2)
        }}</pre> -->

        <component
          :is="pascalCase(section.__component.split('.')[1]) + 'Section'"
          class="q-my-lg"
          v-bind="section"
        >

        </component>

      </template>
    </template>

  </q-page>
</template>

<style lang="scss">
// .app-page > sections {
// }
</style>

<script>
import {
  defineComponent,
  // ref,
  // onMounted,
  watchEffect,
  // toRaw,
} from 'vue';
import { useAxios } from '@vue-composable/axios'
import { useRoute } from 'vue-router';
import { pascalCase } from "change-case";

import HeroSection from '../components/Sections/HeroSection.vue';
import RichTextSection from '../components/Sections/RichTextSection.vue';
import ArticleSection from '../components/Sections/ArticleSection.vue';

/* eslint vue/multi-word-component-names: 0 */
export default defineComponent({
  name: 'Page',
  components: {
    HeroSection,
    RichTextSection,
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
    watchEffect( () => {
      contentExec({
        method: 'GET',
        url: `/bo/api/pages/${route.meta.page.related.id}?populate=*`,
      })
    })
    // console.log('routeMeta', toRaw(route.meta))


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
