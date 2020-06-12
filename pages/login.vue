<template>
  <client-only>
    <card-auth
      title="Ingresá en con tu email"
      :loading="loading"
      :disabled="$v.$invalid"
      name-btn-submit="Ingresar"
      @submit="login"
      :errors="errors"
    >
      <v-text-field
        color="secondary"
        autofocus
        label="Email"
        v-model="form.email"
        type="email"
      ></v-text-field>
      <v-text-field
        color="secondary"
        label="Contraseña"
        v-model="form.password"
        type="password"
      ></v-text-field>

      <template slot="card-footer">
        <nuxt-link to="/register">¿No tenés cuenta?</nuxt-link>
      </template>
    </card-auth>
  </client-only>
</template>

<script>
import { VBtn, VIcon, VImg, VTextField } from "vuetify/lib";
import { required, email } from "vuelidate/lib/validators";
import { mapMutations, mapActions } from "vuex";
import CardAuth from "@/components/CardAuth";
const configMeta = require("@/helpers/seo");
import AuthService from "@/services/auth";

export default {
  name: "Login",
  middleware: "isAuth",
  components: {
    VBtn,
    VIcon,
    VImg,
    VTextField,
    CardAuth
  },

  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },

  head() {
    const page = {
      title: "Inicio de sesión - Dracogram",
      description: "Aca podes ingresar con tu cuenta de Dracogram"
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
        password: ""
      },

      loading: false,

      errors: []
    };
  },

  methods: {
    ...mapActions("notification", ["setNotification"]),
    ...mapActions(["saveSession"]),

    async login() {
      this.loading = true;
      this.errors = [];

      try {
        const resLogin = await AuthService(this.$axios).login(this.form);
        const { data, message } = resLogin;
        const { token, user } = data;
        this.saveSession({ token, user });
        this.setNotification({
          message
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
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";
</style>
