<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated
      class="bg-primary text-white q-px-md no-wrap"
      height-hint="98"
      >

      <q-toolbar>
        <!-- <q-btn flat round dense icon="menu" />
        <q-btn flat round dense icon="search" /> -->

        <q-toolbar-title>
          <q-btn
            icon="img:https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            label="Best Project Ever"
            size="lg"
            to="/"
            unelevated
            />
        </q-toolbar-title>

        <nav class="no-wrap">

          <p v-if="mainNavLoading">
            loading...
          </p>
          <template v-else>

            <q-btn-dropdown
              auto-close
              color="primary"
              icon="menu"
              aria-label="menu"
              c-split
              class="xs"
              unelevated
            >
              <template v-for="navEntry, index of mainNavData" :key="index">
                <q-list>
                  <q-item
                    clickable
                    v-ripple
                    :to="navEntry.path" exact
                  >
                    <q-item-section>{{ navEntry.title }}</q-item-section>
                  </q-item>
                </q-list>
              </template>
            </q-btn-dropdown>

            <q-tabs
              align="left"

              active-color="secondary"
              indicator-color="secondary"
              >

              <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

              <template v-for="navEntry, index of mainNavData" :key="index">

                <q-route-tab
                  v-if="navEntry.items.length == 0"
                  :to="navEntry.path"
                  :label="navEntry.title"
                  class="gt-xs"
                  :aria-label="navEntry.title"
                >
                  <q-tooltip :delay="1000">
                    <pre >{{ navEntry }}</pre>
                  </q-tooltip>

                </q-route-tab>


                <q-btn-dropdown
                  v-if="navEntry.items.length != 0"
                  split
                  stretch
                  flat
                  :c-label="navEntry.title"
                  :to="navEntry.path"
                >
                  <template v-slot:label>

                    <q-route-tab
                      :to="navEntry.path"
                      :label="navEntry.title"
                      class="gt-xs"
                      :aria-label="navEntry.title"
                      @click.stop
                    >
                      <q-tooltip :delay="1000">
                        <pre >{{ navEntry }}</pre>
                      </q-tooltip>
                    </q-route-tab>

                  </template>

                  <q-list>
                    <q-item
                        v-for="subNavEntry, subIndex of navEntry.items" :key="subIndex"
                      clickable
                      v-ripple
                      :to="subNavEntry.path" exact
                    >
                      <q-item-section>{{ subNavEntry.title }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              </template>
            </q-tabs>
          </template>

        </nav>


        <q-btn
          dense
          flat
          round
          @click="$q.dark.toggle()"
          :icon="
            $q.dark.isActive ? 'light_mode' : 'dark_mode'
          "
          c-class="gt-xs"
          :aria-label="$q.dark.isActive ? 'Light Mode' : 'Dark Mode'"
        >
        </q-btn>
        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->

      </q-toolbar>

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
              :to="navEntry.path"
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

.q-tabs .q-btn-dropdown > .q-btn {
  padding: 0;
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
        url: '/bo/api/navigation/render/main-navigation?type=TREE',
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
        url: '/bo/api/navigation/render/footer?type=TREE',
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