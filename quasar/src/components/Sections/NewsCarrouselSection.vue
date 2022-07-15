<template>
  <section
    :class="[
      'doc-section',
      'text-center',
      'flex',
      'items-center',
    ]"
    :style="{
      // border: '1px solid #000',
    }"
    >

    <div class="full-width">
      <h2 v-if="title">{{ title }}</h2>

      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated

        infinite
        :autoplay="carrouselAutoplay"
        @mouseenter="disableAutoplay()"
        @mouseleave="enableAutoplay()"

        control-color="primary"
        navigation
        padding
        arrows
        c-height="300px"
        :class="[
          'bg-grey-1',
          'rounded-borders',
          // 'full-height',
          'gt-xs',
        ]"
        :style="{
          margin: '10px',
        }"

      >
        <q-carousel-slide
          v-for="items, slideIndex of slides"
          :key="slideIndex"
          :name="slideIndex"
          class="column no-wrap"
        >
          <!-- Carrousel: <pre>{{ JSON.stringify(items, null, 2) }}</pre> -->
          <div
            class="row fit justify-start items-center"
          >

            <div
              :class="[
                'my-card',
                'col-' + 12 / items.length,
                'full-height',
              ]"
              v-for="item, itemIndex of items"
              :key="itemIndex"
            >

              <!-- Carrousel: <pre>{{ JSON.stringify(item.post.data.attributes.slug, null, 2) }}</pre> -->

              <router-link
                :to="{ name: item.post.data.attributes.slug }"
                class="card-link full-height"
                c-custom
                c-v-slot="{ navigate, href, route }"
              >
                <q-card class="full-height" flat bordered>
                  <q-card-section horizontal class="full-height">
                    <q-card-section class="q-pt-xs text-left">
                      <div class="text-overline">2022-05-03</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title }}</div>
                      <div class="text-caption text-grey">
                        {{ item.description }}
                      </div>
                    </q-card-section>

                    <q-img
                      class="rounded-borders"
                      c-src="https://cdn.quasar.dev/img/parallax2.jpg"
                      :src="'/bo/' + item.picture.data.attributes.formats.small.url"
                    />
                  </q-card-section>
                </q-card>

              </router-link>
            </div>
          </div>

        </q-carousel-slide>
      </q-carousel>

      <!-- postPreviews: <pre>{{ JSON.stringify(postPreviews, null, 2) }}</pre> -->

      <q-carousel
        v-model="slideXs"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated

        infinite
        :autoplay="carrouselAutoplay"
        @mouseenter="disableAutoplay()"
        @mouseleave="enableAutoplay()"

        control-color="primary"
        navigation
        padding
        arrows
        c-height="300px"
        :class="[
          'bg-grey-1',
          'rounded-borders',
          'xs',
        ]"
        :style="{
          margin: '10px',
          // border: '2px solid #000',
        }"

      >
        <template v-slot:navigation-icon="{ active, btnProps, onClick }">

          <q-btn v-if="active"
            size="sm"
            icon="radio_button_checked"
            color="primary"
            flat round dense
            @click="onClick"
          />
          <q-btn v-else
            size="sm"
            icon="radio_button_unchecked"
            :c-icon="btnProps.icon"
            color="primary"
            flat round dense
            @click="onClick"
          />
        </template>


        <q-carousel-slide
          v-for="item, itemIndex of postPreviews"
          :key="itemIndex"
          :name="itemIndex"
          class="column no-wrap"
        >


          <div
            class="row fit justify-start items-center"
          >
            <div
              :class="[
                // 'my-card',
                'col-12',
                'full-height',
              ]"
            >
              <!-- Item: <pre>{{ JSON.stringify(item, null, 2) }}</pre> -->

              <q-card class="full-height" flat bordered>
                <q-card-section horizontal class="full-height">
                  <q-card-section class="q-pt-xs text-left">
                    <div class="text-overline">2022-05-03</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title }}</div>
                    <div class="text-caption text-grey">
                      {{ item.description }}
                    </div>
                  </q-card-section>

                  <q-img
                    class="rounded-borders"
                    c-src="https://cdn.quasar.dev/img/parallax2.jpg"
                    :src="'/bo/' + item.picture.data.attributes.formats.small.url"
                  />
                </q-card-section>
              </q-card>


            </div>
          </div>

        </q-carousel-slide>
      </q-carousel>


    </div>
  </section>
</template>

<style lang="scss">
.solution-card {
  min-height: 30vh;
  margin: 10px;
}

.card-link {
  display: block;
  color: inherit;
}
</style>

<script>
import {
  defineComponent,
  ref,
  toRaw,
} from 'vue';

export default defineComponent({
  name: 'OffersSection',
  props: {
    title: String,
    postPreviews: Array,
  },
  setup (props) {

    // console.log('props', toRaw(props))
    // console.log('postPreviews', toRaw(props.postPreviews))

    const itemsPerSlide = 2
    const slidesCount = Math.ceil(props.postPreviews.length / itemsPerSlide)

    function splitIntoChunk(array, chunk) {
      const out = []

      while(array.length > 0) {
        out.push(array.splice(0, chunk)) ;
      }

      return out
    }
    const slides = splitIntoChunk(JSON.parse(JSON.stringify(props.postPreviews)), itemsPerSlide);

    // console.log('slides', slides)

    const carrouselAutoplay = ref(true)
    const enableAutoplay = function() {
      if (slides.length <= 1) {
        return
      }

      carrouselAutoplay.value = true
    }
    const disableAutoplay = function() {
      carrouselAutoplay.value = false
    }

    disableAutoplay()


    return {
      slide: ref(0),
      slideXs: ref(0),
      carrouselAutoplay,
      enableAutoplay,
      disableAutoplay,
      itemsPerSlide,
      slidesCound: Math.ceil(props.postPreviews.length / itemsPerSlide),
      slides,
      lorem: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      `
    }
  }
});
</script>
