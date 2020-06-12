<template>
  <core-app>
    <client-only>
      <core-drawer-admin />
      <core-toolbar-admin />
    </client-only>

    <v-content fill-height>
      <nuxt />
    </v-content>
  </core-app>
</template>

<script>
import CoreApp from "~/components/CoreApp";
import CoreDrawerAdmin from "~/components/CoreDrawerAdmin";
import CoreToolbarAdmin from "~/components/CoreToolbarAdmin";
export default {
  components: {
    CoreApp,
    CoreDrawerAdmin,
    CoreToolbarAdmin
  }
};
</script>

<style lang="scss" scoped>
</style>
