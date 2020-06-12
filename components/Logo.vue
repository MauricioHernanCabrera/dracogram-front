<template>
  <nuxt-link
    :to="to"
    class="logo"
    :class="[{ dark }]"
    :style="{ 'font-size': size }"
  >
    <!-- <img
      :src="source"
      :height="height"
      :width="width"
      class="d-block"
      :class="[isGrayscale && 'logo--grayscale']"
    />-->
    Dracogram
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "/"
    },
    dark: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "48px"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";

.logo {
  text-decoration: none;
  display: inline-block;
  &--grayscale {
    filter: grayscale(100%);
  }

  font-family: $font2;
  color: $color_light;
  display: block;
  text-align: center;

  &.dark {
    color: $color_dark4;
  }
}
</style>
