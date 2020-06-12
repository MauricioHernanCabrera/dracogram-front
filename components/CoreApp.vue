<template>
  <v-app>
    <transition name="fade">
      <div class="loader" v-if="firstLoad">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </transition>

    <slot />

    <client-only>
      <v-snackbar
        :value="notification.active"
        @input="DEACTIVE_NOTIFICATION"
        :timeout="0"
        :color="notification.color"
        right
        bottom
      >
        {{ notification.message }}
        <v-btn flat small icon @click="DEACTIVE_NOTIFICATION">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </client-only>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { VSnackbar, VBtn, VIcon } from "vuetify/lib";
export default {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  },

  computed: {
    ...mapState("notification", ["notification"]),
    ...mapState(["firstLoad"])
  },

  methods: {
    ...mapMutations("notification", ["DEACTIVE_NOTIFICATION"]),
    ...mapMutations(["SET_FIRST_LOAD"])
  },

  mounted() {
    setTimeout(() => {
      this.SET_FIRST_LOAD(false);
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";

.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color_light;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;

  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid $color_primary;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>