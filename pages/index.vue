<template>
  <div></div>
</template>

<script>
import { VBtn, VIcon, VImg } from "vuetify/lib";
import {} from "vuex";
import UserService from "@/services/user";

export default {
  name: "Home",

  mixins: [],

  middleware({ store, redirect }) {
    return redirect("/login");
  }
};
</script>

<style lang="scss" scoped>
</style>
