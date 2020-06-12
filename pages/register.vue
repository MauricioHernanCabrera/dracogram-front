<template>
  <client-only>
    <card-auth
      title="Crea tu cuenta con tu email"
      :loading="loading"
      :disabled="$v.$invalid"
      name-btn-submit="Registrarme"
      @submit="register"
      :errors="errors"
    >
      <v-text-field
        color="secondary"
        label="Nombre *"
        v-model="form.firstName"
        type="text"
        @blur="$v.form.firstName.$touch()"
        :error-messages="firstNameErrors"
      ></v-text-field>

      <v-text-field
        color="secondary"
        label="Apellido *"
        v-model="form.lastName"
        type="text"
        @blur="$v.form.lastName.$touch()"
        :error-messages="lastNameErrors"
      ></v-text-field>

      <v-text-field
        color="secondary"
        label="Email *"
        v-model="form.email"
        type="email"
        @blur="$v.form.email.$touch()"
        :error-messages="emailErrors"
      ></v-text-field>

      <v-text-field
        color="secondary"
        label="Contraseña *"
        v-model="form.password"
        type="password"
        @blur="$v.form.password.$touch()"
        :error-messages="passwordErrors"
      ></v-text-field>

      <template slot="card-footer">
        <nuxt-link to="/login">¿Ya tenés una cuenta?</nuxt-link>
      </template>
    </card-auth>
  </client-only>
</template>

<script>
import { VBtn, VIcon, VImg, VTooltip, VTextField } from "vuetify/lib";
import { required, minLength, email, numeric } from "vuelidate/lib/validators";
import { mapMutations, mapActions } from "vuex";
import CardAuth from "@/components/CardAuth";
import AuthService from "@/services/auth";
const configMeta = require("@/helpers/seo");
const MIN_LENGTH_PASSWORD = 6;

export default {
  name: "Login",
  middleware: "isAuth",
  components: {
    VBtn,
    VIcon,
    VImg,
    VTooltip,
    VTextField,
    CardAuth
  },

  validations: {
    form: {
      email: { required, email },
      password: { required },
      firstName: { required },
      lastName: { required }
    }
  },

  head() {
    const page = {
      title: "Registro de cuenta - Dracogram",
      description: "Registrate con tu email en Dracogram"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },

      loading: false,
      errors: []
    };
  },

  methods: {
    ...mapActions("notification", ["setNotification"]),
    ...mapActions(["saveSession"]),

    async register() {
      this.loading = true;
      this.errors = [];
      try {
        const resRegister = await AuthService(this.$axios).register(this.form);
        const resLogin = await AuthService(this.$axios).login(this.form);

        const { data } = resLogin;
        const { token, user } = data;
        this.saveSession({ token, user });
        this.setNotification({
          message: "¡Usuario registrado y logueado!"
        });
        this.$router.push("/admin/users");
      } catch (error) {
        if (error.response) {
          const { message } = error.response.data;
          this.errors = [message];
        }
      } finally {
        this.loading = false;
      }
    }
  },

  computed: {
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
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";

.whatsapp-link {
  text-decoration: none;
  display: block;
  .whatsapp-icon {
  }
}
</style>
