<template>
  <section
    :class="[
      'doc-section',
      'text-center',

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

          <!-- <router-link
            :to="card.target_page.data.attributes."
            custom
            c-v-slot:default="props"
          > -->
            <q-card
              :class="card.css_classes + ' solution-card'"
              :style="{
              }"
              >
              <q-card-section>
                <!-- <div class="text-h6">A Good Solution</div> -->
                <div class="text-h6">{{ card.title }}</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ description }}
              </q-card-section>
            </q-card>

          <!-- </router-link> -->
        </div>

      <!-- <div class="col-12 col-sm-4">
        <q-card
          class="solution-card text-white bg-red-4"
          :style="{
          }"
        >
          <q-card-section>
            <div class="text-h6">An Interesting Solution</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card
          class="solution-card text-white bg-indigo-4"
          :style="{
          }"
        >
          <q-card-section>
            <div class="text-h6">A solution you do not expect</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div> -->
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
