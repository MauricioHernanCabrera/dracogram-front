export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },

    active: {
      type: Boolean,
      default: false
    },

    nameBtnSubmit: {
      type: String,
      default: "Default name btn"
    },

    title: {
      type: String,
      default: "Default title"
    },

    maxWidth: {
      type: String,
      default: "600px"
    }
  }
};
