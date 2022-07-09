<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated
      class="bg-primary text-white q-px-md"
      height-hint="98"
      >
      <!-- <q-toolbar>
      </q-toolbar> -->

      <nav>
        <q-tabs align="left">
          <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Best Project Ever
          </q-toolbar-title>


          <p v-if="mainNavLoading">
            loading...
          </p>
          <template v-else v-for="navEntry, index of mainNavData" :key="index">

            <q-route-tab
              :to="navEntry.path"
              :label="navEntry.title"
            >
              <q-tooltip :delay="1000">
                <pre >{{ navEntry }}</pre>
              </q-tooltip>
            </q-route-tab>
          </template>
          <!-- <q-route-tab to="/solutions" label="Solutions" />
          <q-route-tab to="/news" label="News" />
          <q-route-tab to="/contact" label="Contact Us" /> -->

          <q-space/>
          <q-btn
            dense
            flat
            round
            @click="$q.dark.toggle()"
            :icon="
              $q.dark.isActive ? 'light_mode' : 'dark_mode'
            "
          >
          </q-btn>

          <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        </q-tabs>
      </nav>

    </q-header>

    <q-drawer
      c-show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      >
      <!-- drawer content -->
    </q-drawer>

    <q-drawer
      c-show-if-above
      v-model="rightDrawerOpen"
      side="right" bordered
      >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-6 text-white">
      <q-toolbar>
        <span class="copyright text-caption">
          &copy; {{ new Date().getFullYear() }} Your Promising Company
        </span>
        <q-space></q-space>

          <p v-if="footerNavLoading">
            loading...
          </p>
          <template v-else v-for="navEntry, index of footerNavData" :key="index">

            <q-btn
              flat
              color="grey-2"
              size="sm"
              :label="navEntry.title"
            >
              <q-tooltip :delay="1000">
                <pre >{{ navEntry }}</pre>
              </q-tooltip>
            </q-btn>
          </template>

        <!-- <q-btn flat color="grey-2" size="sm" label="Questions" />
        <q-btn flat color="grey-2" size="sm" label="Cookie Settings" />
        <q-btn flat color="grey-2" size="sm" label="About" /> -->
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style lang="scss">
.copyright {
  color: $grey-3;
}
</style>

<script>
import { ref, watchEffect } from 'vue'
import { useAxios } from '@vue-composable/axios'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const {
      data:mainNavData,
      loading:mainNavLoading,
      exec: mainNavExec,
      status:mainNavStatus
    } = useAxios()

    watchEffect( () => {
      mainNavExec({
        method: 'GET',
        url: '/bo/api/navigation/render/main-navigation',
      })
    })

    const {
      data:    footerNavData,
      loading: footerNavLoading,
      exec:    footerNavExec,
      status:  footerNavStatus
    } = useAxios()

    watchEffect( () => {
      footerNavExec({
        method: 'GET',
        url: '/bo/api/navigation/render/footer',
      })
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        // leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        // rightDrawerOpen.value = !rightDrawerOpen.value
      },

      mainNavData,
      mainNavLoading,
      mainNavStatus,

      footerNavData,
      footerNavLoading,
      footerNavStatus,
    }
  }
}
</script>