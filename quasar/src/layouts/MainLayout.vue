<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated
      class="bg-primary text-white no-wrap"
      height-hint="98"
      >

      <q-toolbar
        class="q-pa-none"
      >
        <!-- <q-btn flat round dense icon="menu" />
        <q-btn flat round dense icon="search" /> -->

        <q-toolbar-title
        >
          <q-btn
            icon="img:https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            label="Best Project Ever"
            size="lg"
            to="/"
            unelevated
            class="logo"
            padding="0 0 0 sm"
            style="font-size: 29px"
            no-wrap
          />
        </q-toolbar-title>

        <nav class="no-wrap">

          <p v-if="mainNavLoading">
            loading...
          </p>
          <template v-else>

            <q-btn
              icon="menu"
              aria-label="menu"
              unelevated
              size="lg"
              class="xs"
              @click="toggleLeftDrawer()"
            >
            </q-btn>

            <q-tabs
              align="left"
              active-color="secondary"
              indicator-color="secondary"
              class="gt-xs"
              >
              <template v-for="navEntry, index of mainNavData" :key="index">

                <!-- <pre v-html="JSON.stringify(navEntry, null, 2)"></pre> -->

                <q-route-tab
                  v-if="navEntry.menuAttached && navEntry.items.length == 0"
                  :to="navEntry.path"
                  :label="navEntry.title"
                  :aria-label="navEntry.title"
                >
                  <q-tooltip :delay="1000">
                    <pre >{{ navEntry }}</pre>
                  </q-tooltip>
                </q-route-tab>

                <q-btn-dropdown
                  v-if="navEntry.menuAttached && navEntry.items.length != 0"
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
          class="gt-xs"
          :aria-label="$q.dark.isActive ? 'Light Mode' : 'Dark Mode'"
        >
        </q-btn>
        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->

      </q-toolbar>

    </q-header>

    <q-drawer
      v-if="$q.screen.xs"
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-toolbar
        class="bg-primary text-white q-pa-none no-wrap"
      >
        <q-toolbar-title>
          <q-btn
            icon="img:https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            label="Best Project Ever"
            size="lg"
            to="/"
            unelevated
            class="logo"
            padding="0 0 0 sm"
            style="font-size: 29px"
            no-wrap
          />

        </q-toolbar-title>
      </q-toolbar>

      <q-scroll-area class="fit">
        <q-list>

          <template v-for="navEntry, index of mainNavData" :key="index">
            <template v-if="navEntry.menuAttached">
              <q-item
                v-if="navEntry.items.length == 0"
                clickable
                :to="navEntry.path"
                v-ripple
              >
                <q-item-section>
                  {{ navEntry.title }}
                </q-item-section>
              </q-item>

              <q-expansion-item
                v-else
                expand-separator
                c-icon="mail"
                :label="navEntry.title"
                c-caption="5 unread emails"
                c-default-opened
              >

                <template v-slot:header>
                  <q-item-section>
                    <router-link
                      :to="navEntry.path"
                      @click.stop
                      v-ripple
                      class="router-link"
                    >
                      {{ navEntry.title }}
                    </router-link>
                  </q-item-section>
                </template>

                <q-list
                  v-if="navEntry.items.length"
                >
                  <q-item
                    v-for="subNavEntry, subIndex of navEntry.items" :key="subIndex"
                    clickable
                    v-ripple
                    :to="subNavEntry.path" exact
                  >
                    <q-item-section>{{ subNavEntry.title }}</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
              <!-- <q-separator :key="'sep' + index"  v-if="menuItem.separator" /> -->
            </template>
          </template>

        </q-list>
      </q-scroll-area>

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

    <q-footer
      elevated
      reveal
      class="bg-grey-6 text-white"
    >
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
              v-if="navEntry.menuAttached"
              flat
              color="grey-2"
              size="sm"
              :label="navEntry.title"
              :to="navEntry.path"
              :href="navEntry.external ? navEntry.path : null"
              :target="navEntry.external ? '_blank' : null"
            >
              <q-tooltip :delay="1000">
                <pre >{{ navEntry }}</pre>
              </q-tooltip>
            </q-btn>
          </template>

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

.logo span.block {
  font-size: 20px;
}

</style>

<script>
import { ref, watchEffect } from 'vue'
import { useAxios } from '@vue-composable/axios'
import { useQuasar } from 'quasar'

export default {
  setup () {

    const $q = useQuasar()

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
      $q,

      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
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