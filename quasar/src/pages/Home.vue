<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page
    class="flex flex-center with-doc-margins"
    :style="{
      // border: '1px solid #000',
    }"
    >

    <div
      :class="[
        // 'q-gutter-lg',
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
          'doc-section',
        ]"
        :style="{
          // border: '1px solid #000',
          // minHeight: 'calc(100vh - 140px)',
          // padding: '15vh 0 20vh 0',
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
          'doc-section',
        ]"
        :style="{
          // border: '1px solid #000',
          // minHeight: 'calc(100vh - 140px)',
          // padding: '15vh 0 20vh 0',
        }"
        >

        <h2>You may be interested by those awesome solutions to all your needs</h2>

        <div class="row full-width">

          <div class="col-12 col-sm-4">
            <q-card
              class="solution-card text-white bg-cyan-3"
              :style="{
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

          <div class="col-12 col-sm-4">
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
          </div>
        </div>
      </section>



      <section
        :class="[
          'text-center',
          'flex',
          'items-center',
          // 'justify-center',
          'doc-section',
        ]"
        :style="{
          // border: '1px solid #000',
          // minHeight: 'calc(100vh - 140px)',
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
              'gt-xs',
            ]"
            :style="{
              margin: '10px',
            }"

          >
            <q-carousel-slide :name="1" class="column no-wrap">
              <div class="row fit justify-start items-center">
              <!-- <div class="row fit justify-start items-center
              q-gutter-xs q-col-gutter no-wrap"> -->

                <div class="my-card col-4 full-height">
                  <q-card class="full-height" flat bordered>
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
                </div>

                <div class="my-card col-4 full-height">
                  <q-img class="rounded-borders full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
                </div>
                <div class="my-card col-4 full-height">
                  <q-img class="rounded-borders full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" class="column no-wrap">
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
              </div>
            </q-carousel-slide>
          </q-carousel>


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
              'xs',
            ]"
            :style="{
              margin: '10px',
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

            <q-carousel-slide :name="1" class="column no-wrap">
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter">
              <!-- <div class="row fit justify-start items-center
              q-gutter-xs q-col-gutter no-wrap"> -->

                <q-card class="my-card col-12 col-md-3 full-height" flat bordered>
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
                      alt="illustration of Good News!"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </q-carousel-slide>

            <q-carousel-slide :name="2" class="column no-wrap">
              <q-img class="rounded-borders col-12 col-md-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
            </q-carousel-slide>
            <q-carousel-slide :name="3" class="column no-wrap">
              <q-img class="rounded-borders col-12 col-md-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-carousel-slide>

            <q-carousel-slide :name="4" class="column no-wrap">
              <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
            </q-carousel-slide>

            <q-carousel-slide :name="5" class="column no-wrap">
              <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
            </q-carousel-slide>


          </q-carousel>


        </div>

      </section>

    </div>

  </q-page>
</template>

<style lang="scss">
.solution-card {
  min-height: 30vh;
  margin: 10px;
}

.q-carousel__slide > .row > * {
  margin: 5px;
}
</style>

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
