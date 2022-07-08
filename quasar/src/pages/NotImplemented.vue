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

        <h2>This view is not implemented yet</h2>
      </section>


    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotImplemented',
  setup () {
    return {
    }
  }
});
</script>
