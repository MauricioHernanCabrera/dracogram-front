export default {
  data() {
    return {
      dialog: {
        active: "",
        data: {},
        title: "",
        nameBtnSubmit: ""
      }
    };
  },

  methods: {
    setDialog({
      data = {},
      active = "",
      title = "",
      nameBtnSubmit = "Crear",
      warningMessage = ""
    }) {
      this.dialog.data = JSON.parse(JSON.stringify(data));
      this.dialog.nameBtnSubmit = nameBtnSubmit;
      this.dialog.title = title;
      this.dialog.warningMessage = warningMessage;
      this.dialog.active = active;
    },

    cancelDialog() {
      this.setDialog({ active: "" });
    }
  }
};
