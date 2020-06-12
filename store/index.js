import AuthService from "@/services/auth";
import atob from "atob";

export const state = () => ({
  firstLoad: true,
  drawer: null,
  user: null,
  pageName: "Inicio"
});

export const getters = {
  isAuth: ({ user }) => user && user.email
};

export const mutations = {
  SET_FIRST_LOAD(state, firstLoad) {
    state.firstLoad = firstLoad;
  },

  SET_PAGE_NAME(state, pageName) {
    state.pageName = pageName;
  },

  SET_USER(state, user) {
    state.user = user;
  },

  SET_DRAWER(state, drawer) {
    state.drawer = drawer;
  }
};

export const actions = {
  logout({ commit }) {
    commit("SET_USER", null, { root: true });
    this.$router.push("/");
    this.$cookies.remove("token");
    this.$axios.setHeader("Authorization", `Bearer`);
  },

  saveSession({ commit }, { user, token }) {
    const myDate = new Date();
    const expires = new Date(myDate.setDate(myDate.getDate() + 30));

    this.$axios.setHeader("Authorization", `Bearer ${token}`);
    this.$cookies.set("token", token, {
      path: "/",
      expires,
      samesite: "strict"
    });

    commit("SET_USER", user);
  },

  async nuxtServerInit({ commit }) {
    try {
      const token = this.$cookies.get("token");
      console.log(">>> nuxtServerInit <<<");
      if (token) {
        await AuthService(this.$axios).verify(token);
        const [a, base64] = token.split(".");
        const user = JSON.parse(atob(base64));
        commit("SET_USER", user);
      }
    } catch (error) {
      // this.$cookies.remove("token");
    }
  }
};
