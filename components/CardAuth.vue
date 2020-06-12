<template>
  <div class="card-auth">
    <div class="card-auth-container">
      <div class="card-auth-box">
        <div class="card-auth-header">
          <logo dark />

          <h1 class="card-auth-title">{{ title }}</h1>
          <p
            class="card-auth-description"
            v-show="description && description.length >= 1"
          >
            {{ description }}
          </p>

          <v-alert :value="true" color="error" v-if="errors.length >= 1">
            <span v-if="errors.length === 1">{{ errors[0] }}</span>
            <ul class="errors" v-else>
              <li class="error-item" v-for="error in errors" :key="error">
                {{ error }}
              </li>
            </ul>
          </v-alert>
        </div>

        <form class="card-auth-form" @submit.prevent="$emit('submit')">
          <slot />

          <v-btn
            class="card-auth-btn"
            depressed
            large
            block
            type="submit"
            color="primary"
            :disabled="disabled || loading"
            :loading="loading"
            >{{ nameBtnSubmit }}</v-btn
          >

          <div class="card-auth-footer-form">
            <slot name="form-footer" />
          </div>
        </form>
      </div>

      <div class="card-auth-footer">
        <slot name="card-footer" />
      </div>
    </div>
  </div>
</template>

<script>
import breakpoint from "@/mixins/breakpoint";
import { VBtn, VImg, VAlert } from "vuetify/lib";
import Logo from "@/components/Logo";
export default {
  mixins: [breakpoint],

  components: {
    VBtn,
    VImg,
    VAlert,
    Logo
  },

  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    nameBtnSubmit: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    errors: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";

.errors {
  list-style: initial;
  margin-left: 12px;
  .error-item {
  }
}
.card-auth {
  min-height: 100vh;
  overflow-x: auto;
  background-color: $color_grey3;
  display: flex;
  justify-content: center;

  @include breakpoint(sm) {
    align-items: center;
  }

  .card-auth-container {
    width: 100%;
    max-width: 400px;

    .card-auth-box {
      background-color: $color_light;
      border-radius: 0;
      padding: 28px 32px;

      @include breakpoint(sm) {
        border-radius: 22px;
      }
      .card-auth-header {
        margin-top: 24px;
        margin-bottom: 12px;

        .card-auth-link {
          display: block;
          .card-auth-logo {
            margin: 0 auto;
            margin-bottom: 6px;
            width: 100%;
            max-width: 192px;
          }
        }
        .card-auth-title {
          text-align: center;
          font-size: 20px;
          font-weight: 400;
          color: $color_grey6;
        }
      }

      .card-auth-form {
        .card-auth-input {
        }
        .card-auth-input-email {
        }
        .card-auth-input-password {
        }

        .card-auth-btn {
          margin-top: 24px;
          border-radius: 8px;
          height: 50px;
        }

        .card-auth-footer-form {
          a {
            text-decoration: none;
            color: $color_dark2;
            display: block;
            padding-top: 12px;
            width: 100%;
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }

    .card-auth-footer {
      a {
        text-decoration: none;
        color: $color_dark2;
        display: block;
        padding: 24px 0;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
