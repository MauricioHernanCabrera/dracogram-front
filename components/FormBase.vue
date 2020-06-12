<template>
  <v-dialog
    @input="$emit('cancel-form')"
    :value="active"
    transition="dialog-bottom-transition"
    persistent
    ref="formBase"
    :max-width="fullscreen ? '100%' : maxWidth"
    :fullscreen="fullscreen"
  >
    <v-card flat class="card-form-base">
      <v-form @submit.prevent="$emit('submit-form')">
        <v-toolbar dark color="primary" v-if="fullscreen" class="elevation-0">
          <v-btn icon dark @click="$emit('cancel-form')">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title class="ml-0">{{ title }}</v-toolbar-title>
        </v-toolbar>

        <v-card-title v-else>
          <span class="headline text-truncate">{{ title }}</span>

          <v-spacer></v-spacer>
        </v-card-title>

        <v-container class="mb-5">
          <slot />
        </v-container>

        <v-footer v-if="fullscreen && active" height="56px" app>
          <v-container fill-height class="pa-0">
            <v-layout align-center mx-2>
              <v-btn flat @click="$emit('cancel-form')" class="btn-close">Cerrar</v-btn>

              <v-spacer />

              <v-btn
                :disabled="disabled"
                depressed
                :loading="loading"
                type="submit"
                color="primary"
                class="btn-submit"
              >
                {{ nameBtnSubmit }}
                <span slot="loader" class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </v-btn>
            </v-layout>
          </v-container>
        </v-footer>

        <v-card-actions v-else>
          <v-btn flat @click="$emit('cancel-form')" class="btn-close">Cerrar</v-btn>
          <v-spacer></v-spacer>

          <v-btn
            :disabled="disabled"
            depressed
            type="submit"
            color="primary"
            class="btn-submit"
            :loading="loading"
          >
            {{ nameBtnSubmit }}
            <span slot="loader" class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import basePropsForm from "@/mixins/basePropsForm";
import {
  VForm,
  VCard,
  VCardActions,
  VCardTitle,
  VToolbarTitle,
  VToolbar,
  VDialog,
  VFooter,
  VBtn,
  VIcon
} from "vuetify/lib";
export default {
  components: {
    VForm,
    VCard,
    VCardActions,
    VCardTitle,
    VToolbarTitle,
    VToolbar,
    VDialog,
    VFooter,
    VBtn,
    VIcon
  },
  mixins: [basePropsForm],

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    fullscreen: {
      type: Boolean,
      required: true
    }
  }
};
</script>


<style lang="scss" scoped>
.card-form-base {
  border-radius: 10px;
}
.btn-submit,
.btn-close {
  border-radius: 10px;
}
</style>