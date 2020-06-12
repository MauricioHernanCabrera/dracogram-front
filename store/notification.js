export const state = () => ({
  notification: {
    active: false,
    color: "",
    duration: 3000,
    timeout: null,
    message: ""
  }
});

export const mutations = {
  SET_NOTIFICATION(state, notification) {
    state.notification = notification;
  },

  DEACTIVE_NOTIFICATION(state) {
    state.notification.timeout && clearTimeout(state.notification.timeout);
    state.notification.timeout = null;
    state.notification.active = false;
  }
};

export const actions = {
  setNotification(
    { commit },
    {
      color = "#666666",
      duration = 5000,
      message = "Ocurrio un error inesperado! Reinicia la pagina y volve a intentarlo"
    }
  ) {
    commit("DEACTIVE_NOTIFICATION");

    setTimeout(() => {
      const timeout = setTimeout(() => commit('DEACTIVE_NOTIFICATION'), duration); // prettier-ignore

      commit("SET_NOTIFICATION", {
        duration,
        message,
        color,
        active: true,
        timeout
      });
    }, 300);
  },

  handleError({ dispatch }, error = {}) {
    const { response = null } = error;

    if (response && response.data) {
      const message = response.data.message;
      return dispatch("setNotification", { color: "warning", message });
    }

    dispatch("setNotification", {
      color: "warning",
      message:
        "Ocurrio un error inesperado! Reinicia la pagina y volve a intentarlo"
    });
  }
};
