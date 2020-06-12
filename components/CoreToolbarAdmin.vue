<template>
  <v-toolbar app color="primary" dark class="core-toolbar-admin" height="60px">
    <div class="core-toolbar-admin-container">
      <div>
        <v-btn @click.stop="SET_DRAWER(!drawer)" icon flat class="core-toolbar-admin-menu">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <span class="core-toolbar-admin-title">{{ pageName }}</span>
      </div>

      <v-btn @click.stop="SET_DRAWER(!drawer)" flat class="core-toolbar-admin-menu mx-0">MENÚ</v-btn>
      <!-- <nuxt-link class="core-toolbar-my-store" :to="`/store/${user.store}`">Ver mi tienda</nuxt-link> -->
    </div>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import {
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbar,
  VBtn,
  VIcon
} from "vuetify/lib";

export default {
  components: {
    VToolbarSideIcon,
    VToolbarTitle,
    VToolbar,
    VBtn,
    VIcon
  },

  methods: {
    ...mapMutations(["SET_DRAWER"])
  },

  computed: {
    ...mapState(["drawer", "pageName", "user"])
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";

.core-toolbar-admin {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.32);

  .core-toolbar-admin-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .core-toolbar-admin-menu {
    // display: block;
    // @include breakpoint(lg) {
    //   display: none;
    // }
  }
  .core-toolbar-admin-title {
    font-weight: 700;
  }

  .core-toolbar-my-store {
    color: $color_light;
    text-decoration: none;
  }
}
</style>
