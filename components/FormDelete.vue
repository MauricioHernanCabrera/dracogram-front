<template>
  <form-base
    :disabled="loading"
    :loading="loading"
    :nameBtnSubmit="nameBtnSubmit"
    :title="title"
    :active="active"
    :fullscreen="false"
    maxWidth="500px"
    @submit-form="submitForm"
    @cancel-form="$emit('cancel-form')"
  >
    <v-layout v-if="active" row wrap>
      <v-flex xs12>
        <v-alert
          :value="true"
          color="warning"
          v-if="warningMessage && warningMessage.length"
          >{{ warningMessage }}</v-alert
        >
      </v-flex>

      <v-flex xs12>
        <v-text-field
          color="secondary"
          v-model="data.name"
          required
          label="Email"
          autofocus
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
  </form-base>
</template>

<script>
import baseForm from "@/mixins/baseForm";
import FormBase from "~/components/FormBase";
import { VTextField, VAlert } from "vuetify/lib";

export default {
  components: {
    FormBase,
    VTextField,
    VAlert
  },

  mixins: [baseForm],

  props: {
    warningMessage: {
      type: String,
      default: ""
    }
  },

  methods: {
    async submitForm() {
      await this.$emit("submit-form", this.data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
