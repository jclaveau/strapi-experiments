<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page
    class="flex flex-center q-mx-xl"
    :style="{
      // border: '1px solid #000',
    }"
    >

    <div
      :class="[
        'q-gutter-lg',
        'full-width',
        'q-py-lg',
      ]"

      :style="{
        // minHeight: 'inherit', // https://forum.quasar-framework.org/topic/4032/how-to-make-a-q-page-container-child-use-full-height-of-its-grandparent/10
      }"
      >
      <section
        :class="[
          'text-center',
          'flex',
          'items-center',
          'justify-center',
        ]"
        :style="{
          // border: '1px solid #000',
          height: 'calc(100vh - 140px)',
          padding: '15vh 0 20vh 0',
        }"
        >

        <h1 class="bg-secondary" style="line-height: 8rem">&nbsp;Your project&nbsp;</h1><br/>
        <h2>The best project you ever wanted to achieve</h2>
      </section>

      <section
        :class="[
          'text-center',
          'flex',
          'items-center',
          'justify-center',
        ]"
        :style="{
          // border: '1px solid #000',
          height: 'calc(100vh - 140px)',
          padding: '15vh 0 20vh 0',
        }"
        >

        <h2>You may be interested by those awesome solutions to all your needs</h2>

        <div class="row q-gutter-md full-width">
          <div
            class="col"
            >
            <q-card
              class="my-card text-white bg-cyan-3"
              :style="{
                height: '30vh',
              }"
              >
              <q-card-section>
                <div class="text-h6">A Good Solution</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ lorem }}
              </q-card-section>
            </q-card>
          </div>
          <div class="col">
            <q-card
              class="my-card text-white bg-red-4"
              :style="{
                height: '30vh',
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
          <div class="col">
            <q-card
              class="my-card text-white bg-indigo-4"
              :style="{
                height: '30vh',
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
          </div>
        </div>

      </section>

      <section
        :class="[
          'text-center',
          'flex',
          'items-center',
          // 'justify-center',
        ]"
        :style="{
          // border: '1px solid #000',
          height: 'calc(100vh - 140px)',
          // minHeight: 'inherit',
        }"
        >

        <div class="full-width">

          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated

            infinite
            :autoplay="carouselAutoplay"
            @mouseenter="carouselAutoplay = false"
            @mouseleave="carouselAutoplay = true"

            control-color="primary"
            navigation
            padding
            arrows
            c-height="300px"
            :class="[
              'bg-grey-1',
              'rounded-borders',
              // 'full-height',
            ]"
          >
            <q-carousel-slide :name="1" class="column no-wrap">
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">

                <q-card class="my-card col-3 full-height" flat bordered>
                  <q-card-section horizontal class="full-height">
                    <q-card-section class="q-pt-xs text-left">
                      <div class="text-overline">2022-05-03</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">Good News!</div>
                      <div class="text-caption text-grey">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </div>
                    </q-card-section>

                    <q-img
                      class="rounded-borders"
                      src="https://cdn.quasar.dev/img/parallax2.jpg"
                    />
                  </q-card-section>
                </q-card>



                <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
                <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" class="column no-wrap">
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
              </div>
            </q-carousel-slide>
          </q-carousel>


        </div>

      </section>

    </div>




  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    return {
      slide: ref(1),
      carouselAutoplay: ref(true),
      lorem: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      `
    }
  }
});
</script>
