<template>
  <section
    :class="[
      'doc-section',
      'text-center',
      'flex',
      'items-center',
      'justify-center',
      'q-py-lg',
    ]"
    :style="{
      // border: '1px solid #000',
    }"
    >

    <h2>{{ description }}</h2>
    <!-- <h2>You may be interested by those awesome solutions to all your needs</h2> -->

    <div class="row full-width">


        <div
          v-for="card, index of cards" :key="index"
          class="col-12 col-sm-4"
        >
        <!-- <pre>{{
          JSON.stringify(card.target_page.data, null, 2)
        }}</pre> -->

          <template v-if="card.target_page.data != null">
            <router-link
              :to="{ name: card.target_page.data.attributes.slug }"
            >
              <q-card
                :class="card.css_classes + ' solution-card'"
                :style="{
                }"
                >
                <q-card-section>
                  <div class="text-h6">{{ card.title }}</div>
                  <!-- <div class="text-subtitle2">by John Doe</div> -->
                </q-card-section>

                <q-card-section class="q-pt-none">
                  {{ card.description }}
                </q-card-section>
              </q-card>

            </router-link>
          </template>
          <q-card
            v-else
            :class="card.css_classes + ' solution-card'"
            :style="{
            }"
            >
            <q-card-section>
              <div class="text-h6">{{ card.title }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{ card.description }}
            </q-card-section>
          </q-card>


        </div>
    </div>

  </section>
</template>

<style lang="scss">
.solution-card {
  min-height: 30vh;
  margin: 10px;
}
</style>

<script>
import {
  defineComponent,
  // ref
  toRaw,
} from 'vue';

export default defineComponent({
  name: 'OffersSection',
  props: {
    title: String,
    cards: Array,
    description: String,
  },
  setup (props) {

    console.log('props', toRaw(props))


    return {
      lorem: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      `
    }
  }
});
</script>
