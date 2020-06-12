<template>
  <client-only>
    <div class="users">
      <div class="users-container custom-container">
        <div class="users-toolbar">
          <div class="users-filter">
            <v-text-field
              solo
              flat
              hide-details
              class="input-search"
              placeholder="Buscar"
              append-icon="mdi-magnify"
              v-model="search"
            ></v-text-field>
          </div>

          <div class="users-create">
            <v-btn
              class="btn-create"
              depressed
              color="primary"
              outline
              @click="
                setDialog({
                  title: 'Crear usuario',
                  nameBtnSubmit: 'Crear',
                  active: 'create'
                })
              "
            >Crear usuario</v-btn>

            <v-footer class="btn-create-floating" height="72px" app v-if="breakpoint.xs">
              <div class="custom-container">
                <v-btn
                  class="btn"
                  depressed
                  color="primary"
                  block
                  large
                  @click="
                    setDialog({
                      title: 'Crear usuario',
                      nameBtnSubmit: 'Crear',
                      active: 'create'
                    })
                  "
                >
                  <span class="text">Crear usuario</span>
                </v-btn>
              </div>
            </v-footer>
          </div>
        </div>

        <ul class="users-list">
          <v-list-tile
            v-if="usersFiltered.length == 0"
            class="user-item custom-list-tile-user-item"
          >
            <v-list-tile-content>No se encontraron usuarios</v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="user-item custom-list-tile-user-item"
            v-else
            v-for="user in usersFiltered"
            :key="user.id"
          >
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-6" :src="user.gravatarUrl"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <p class="user-item-fullname text-truncate">{{ user.firstName }} {{ user.lastName }}</p>
              <p class="user-item-email text-truncate">{{ user.email }}</p>
            </v-list-tile-content>

            <v-layout align-center justify-end class="user-item-actions">
              <v-menu bottom left>
                <template #activator="{ on: menu }">
                  <v-tooltip bottom>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        color="grey6"
                        dark
                        v-on="{ ...tooltip, ...menu }"
                        depressed
                        icon
                        flat
                        class="btn-menu"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <span>Opciones</span>
                  </v-tooltip>
                </template>

                <v-list>
                  <v-list-tile
                    @click="
                      setDialog({
                        title: 'Actualizar usuario',
                        data: {
                          email: user.email,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          id: user.id
                        },
                        nameBtnSubmit: 'Actualizar',
                        active: 'update'
                      })
                    "
                  >
                    <v-list-tile-title>Editar usuario</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile
                    @click="
                      setDialog({
                        title: 'Eliminar usuario',
                        data: {
                          name: user.email,
                          id: user.id
                        },
                        nameBtnSubmit: 'eliminar',
                        warningMessage:
                          'Si eliminas el usuario le quitaras el acceso a otra persona :(',
                        nameBtnSubmit: 'eliminar',
                        active: 'delete'
                      })
                    "
                  >
                    <v-list-tile-title>Eliminar usuario</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-layout>
          </v-list-tile>
        </ul>
      </div>

      <form-user-create
        :data="dialog.data"
        :active="dialog.active == 'create'"
        :title="dialog.title"
        :loading="loading"
        :nameBtnSubmit="dialog.nameBtnSubmit"
        @cancel-form="cancelDialog"
        @submit-form="submitFormCreate"
      />

      <form-user-update
        :data="dialog.data"
        :active="dialog.active == 'update'"
        :title="dialog.title"
        :loading="loading"
        :nameBtnSubmit="dialog.nameBtnSubmit"
        @cancel-form="cancelDialog"
        @submit-form="submitFormUpdate"
      />

      <form-delete
        :data="dialog.data"
        :active="dialog.active == 'delete'"
        :title="dialog.title"
        :loading="loading"
        :nameBtnSubmit="dialog.nameBtnSubmit"
        :warningMessage="dialog.warningMessage"
        @cancel-form="cancelDialog"
        @submit-form="deleteItem"
      />
    </div>
  </client-only>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  VBtn,
  VIcon,
  VTextField,
  VTooltip,
  VMenu,
  VFooter,
  VAlert,
  VListTile,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle,
  VList,
  VImg,
  VCard
} from "vuetify/lib";
import handleForm from "@/mixins/handleForm";
import sendRequest from "@/mixins/sendRequest";
import FormUserCreate from "@/components/FormUserCreate";
import FormUserUpdate from "@/components/FormUserUpdate";
import FormDelete from "@/components/FormDelete";
import breakpoint from "@/mixins/breakpoint";
import UserService from "@/services/user";
import CryptoJS from "crypto-js";

const makeGravatarUrl = email => {
  return `https://www.gravatar.com/avatar/${CryptoJS.MD5(email.toLowerCase())}`;
};

export default {
  layout: "admin",
  middleware: "isNotAuth",
  components: {
    VBtn,
    VIcon,
    VTextField,
    VTooltip,
    FormDelete,
    FormUserCreate,
    FormUserUpdate,
    VMenu,
    VFooter,
    VAlert,
    VListTile,
    VListTileAvatar,
    VListTileContent,
    VListTileTitle,
    VListTileSubTitle,
    VList,
    VImg,
    VCard
  },

  mixins: [handleForm, sendRequest, breakpoint],

  async asyncData({ $axios, store: { state } }) {
    let users = [];
    try {
      const resUsers = await UserService($axios).getAll();
      users = resUsers.data.map(user => ({
        ...user,
        gravatarUrl: makeGravatarUrl(user.email)
      }));
    } catch (error) {
      console.log("error-users", error);
    } finally {
      return {
        users
      };
    }
  },

  fetch({ store }) {
    return store.commit("SET_PAGE_NAME", "Usuarios");
  },

  data() {
    return {
      search: ""
    };
  },

  computed: {
    usersFiltered() {
      const search = this.search.toLowerCase();
      const filter = ({ email }) => email.toLowerCase().includes(search);

      return this.users.filter(filter);
    }
  },

  methods: {
    ...mapMutations(["SET_PAGE_NAME"]),

    deleteItem({ id: userId }) {
      const callbackTry = async () => {
        const { message } = await UserService(this.$axios).deleteOne(userId);

        const index = this.users.findIndex(item => item.id == userId);
        if (index != -1) this.users.splice(index, 1);

        return {
          message,
          duration: 10000
        };
      };

      this.sendRequest(callbackTry, null, this.cancelDialog);
    },

    submitFormCreate(payload) {
      const callbackTry = async () => {
        const resUser = await UserService(this.$axios).createOne(payload);
        console.log(resUser);
        const { message, data } = resUser;

        this.users.push({ ...data, gravatarUrl: makeGravatarUrl(data.email) });
        this.cancelDialog();
        return {
          message
        };
      };

      this.sendRequest(callbackTry, null);
    },

    submitFormUpdate(payload) {
      const callbackTry = async () => {
        const { id: userId, ...body } = payload;
        const { message, data } = await UserService(this.$axios).updateOne(
          userId,
          body
        );

        const userFindIndex = user => user.id == userId;
        const userIndex = this.users.findIndex(userFindIndex);

        if (userIndex != -1) {
          this.users.splice(userIndex, 1, {
            ...data,
            gravatarUrl: makeGravatarUrl(data.email)
          });
        }

        this.cancelDialog();
        return {
          message
        };
      };

      this.sendRequest(callbackTry, null);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/utils";

.users {
  .users-container {
    padding-top: 24px;
    padding-bottom: 24px;
    .users-toolbar {
      display: flex;
      position: relative;
      justify-content: space-between;

      .users-filter {
        flex-basis: 100%;
        @include breakpoint(sm) {
          flex-basis: 500px;
        }
        .input-search {
        }
      }

      .users-create {
        .btn-create {
          display: none;
          @include breakpoint(sm) {
            display: block;
          }
          margin-right: 0;
          border-radius: 5px;
        }

        .btn-create-floating {
          display: flex;
          align-items: center;
          background-color: $color_light;
          border-top: 2px solid $color_grey4;
          @include breakpoint(sm) {
            display: none;
          }
          .btn {
            border-radius: 10px;
          }
        }
      }
    }

    .users-list {
      margin-top: 12px;
      border-radius: 5px;
      display: grid;
      gap: 12px;
      grid-template-columns: 1fr;
      @include breakpoint(xs) {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }

      .user-item {
        background-color: $color_light;
        box-shadow: 0 0.07em 0.125em 0 rgba(0, 0, 0, 0.15);
        transition: 0.1s;
        padding: 6px 0;
        border-bottom: 0.0625em solid #eee;
        border-radius: 10px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        .user-item-fullname {
          font-size: 14px;
          font-weight: 700;
          line-height: 14px;
          margin: 0;
        }
        .user-item-email {
          font-size: 10px;
          line-height: 10px;
          font-weight: 400;
          margin: 0;
        }

        .user-item-actions {
          position: absolute;
          right: 0;
          top: 0;
          .btn-menu {
            background-color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
}
</style>
