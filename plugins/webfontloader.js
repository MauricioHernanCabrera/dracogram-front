import WebFont from "webfontloader";

export default function({ app }) {
  const { $cookies, $axios, store } = app;
  WebFont.load({
    google: {
      families: ["Karla:400,400i,700,700i", "Lobster"]
    },
    custom: {
      families: ["materialdesignicons"],
      urls: [
        "https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.css"
      ]
    },
    // fontloading: function(event) {},
    fontactive: function(event) {
      store.commit("SET_FIRST_LOAD", false);
    }
  });
}
