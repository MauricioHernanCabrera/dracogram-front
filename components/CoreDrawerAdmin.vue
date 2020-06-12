<template>
  <v-navigation-drawer
    @input="value => SET_DRAWER(value)"
    :value="drawer"
    fixed
    app
    class="core-drawer-admin"
    v-if="isAuth"
  >
    <div class="core-drawer-container">
      <div class="user" v-if="isAuth">
        <logo size="24px" />
        <!-- <div class="user-avatar">{{ user.email.slice(0, 1) }}</div>

        <div class="user-info">
          <span class="user-email">{{ user.email }}</span>
        </div> -->
      </div>

      <ul class="route-list">
        <li class="route-item route-item-home">
          <a
            class="route-link"
            href="https://mauriciohernancabrera.github.io"
            target="_blank"
          >
            <span class="route-name">Ver portfolio de Hernan</span>
          </a>
        </li>

        <hr class="route-border" />

        <li
          class="route-item"
          v-for="routeItem in routeList"
          :key="routeItem.id"
        >
          <nuxt-link
            class="route-link"
            :to="routeItem.to"
            exact
            active-class="active"
          >
            <v-icon class="route-icon">{{ routeItem.icon }}</v-icon>
            <span class="route-name">{{ routeItem.name }}</span>
          </nuxt-link>
        </li>
      </ul>

      <v-spacer></v-spacer>

      <div class="logout" @click="logout">
        <v-icon class="logout-icon">mdi-door-open</v-icon>
        <span class="logout-name">Cerrar sesión</span>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import { VNavigationDrawer, VBtn, VIcon, VSpacer } from "vuetify/lib";
import Logo from "@/components/Logo";

export default {
  components: {
    VNavigationDrawer,
    VBtn,
    VIcon,
    VSpacer,
    Logo
  },

  data() {
    return {
      routeList: [
        // {
        //   id: 1,
        //   name: "Mi perfil",
        //   to: "/admin/profile",
        //   icon: "mdi-face-profile"
        // },
        {
          id: 2,
          name: "Usuarios",
          to: "/admin/users",
          icon: "mdi-account-group-outline"
        }
      ]
    };
  },

  methods: {
    ...mapMutations(["SET_DRAWER"]),
    ...mapActions(["logout"])
  },

  computed: {
    ...mapState(["user", "drawer"]),
    ...mapGetters(["isAuth"])
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/utils";
.core-drawer-admin {
  background-color: $color_grey3;

  .core-drawer-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .user {
      background-color: $color_primary;
      position: relative;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.32);
      padding: 12px 24px;
    }

    .route-list {
      margin-top: 16px;
      .route-border {
        height: 2px;
        width: calc(100% - 24px);
        border: 0;
        margin-top: 8px;
        margin-bottom: 8px;
        margin-left: auto;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .route-item {
        &.route-item-home {
        }

        .route-link {
          text-decoration: none;
          color: $color_dark2;
          height: 46px;
          display: flex;
          align-items: center;
          padding-left: 24px;
          transition: 0.1s;
          &:hover {
            background-color: rgba(0, 0, 0, 0.04);
          }
          &.active {
            box-shadow: inset 0.25em 0 0 $color_primary;
            .route-icon {
              color: $color_primary;
            }
            .route-name {
              color: $color_primary;
            }
          }

          .route-icon {
            width: 24px;
            margin-right: 16px;
            font-size: 24px;
          }

          .route-name {
            font-size: 14px;
            font-weight: 700;
          }
        }
      }
    }

    .logout {
      text-decoration: none;
      color: $color_dark2;
      min-height: 46px;
      display: flex;
      align-items: center;
      padding-left: 24px;
      transition: 0.1s;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
      .logout-icon {
        width: 24px;
        margin-right: 16px;
        font-size: 24px;
      }
      .logout-name {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}

// .custom-avatar {
//   .letter {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 50%;
//     text-transform: uppercase;
//     font-weight: 700;
//     font-size: 20px;
//   }
// }
// .custom-drawer {
//   background: linear-gradient(to bottom, #08532e, #b2cc31);
//   .route-list {
//     .route-item {
//       .v-list__tile--active {
//         background: red !important;
//         border-radius: 5px;
//       }
//     }
//   }
// }
</style>
