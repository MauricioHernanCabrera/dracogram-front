<template>
  <form-base
    :disabled="$v.$invalid || loading"
    :loading="loading"
    :nameBtnSubmit="nameBtnSubmit"
    :title="title"
    :active="active"
    @submit-form="submitForm"
    @cancel-form="$emit('cancel-form')"
    :fullscreen="breakpoint.xs"
    max-width="600px"
  >
    <v-layout v-if="active" wrap row>
      <v-flex xs12>
        <v-text-field
          color="secondary"
          v-model="form.firstName"
          required
          label="Nombre (*)"
          @blur="$v.form.firstName.$touch()"
          :error-messages="firstNameErrors"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          color="secondary"
          v-model="form.lastName"
          required
          label="Apellido (*)"
          @blur="$v.form.lastName.$touch()"
          :error-messages="lastNameErrors"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          color="secondary"
          v-model="form.email"
          required
          type="email"
          label="Email (*)"
          @blur="$v.form.email.$touch()"
          :error-messages="emailErrors"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          color="secondary"
          v-model="form.password"
          required
          type="password"
          label="Contraseña (*)"
          @blur="$v.form.password.$touch()"
          :error-messages="passwordErrors"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </form-base>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import baseForm from "@/mixins/baseForm";
import breakpoint from "@/mixins/breakpoint";
import FormBase from "@/components/FormBase";

import { VTextField } from "vuetify/lib";

export default {
  mixins: [baseForm, breakpoint],

  components: {
    FormBase,
    VTextField
  },

  validations: {
    form: {
      email: { required, email },
      password: { required },
      firstName: { required },
      lastName: { required }
    }
  },

  watch: {
    active(newValue, oldValue) {
      this.form = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      };

      this.$v.$reset();
    }
  },

  computed: {
    ...mapState(["categories"]),

    emailErrors() {
      const errors = [];
      const { $dirty, required, email } = this.$v.form.email;
      if (!$dirty) return errors;
      !required && errors.push("¡El email es requerido!");
      !email && errors.push("¡El email es invalido!");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      const { $dirty, required } = this.$v.form.password;
      if (!$dirty) return errors;
      !required && errors.push("¡La contraseña es requerida!");
      return errors;
    },

    firstNameErrors() {
      const errors = [];
      const { $dirty, required } = this.$v.form.firstName;
      if (!$dirty) return errors;
      !required && errors.push("¡El nombre es requerido!");
      return errors;
    },

    lastNameErrors() {
      const errors = [];
      const { $dirty, required } = this.$v.form.lastName;
      if (!$dirty) return errors;
      !required && errors.push("¡El apellido es requerido!");
      return errors;
    }
  },

  methods: {
    async submitForm() {
      await this.$emit("submit-form", this.form);
    }
  }
};
</script>
<style scoped></style>
