import Vue from "vue";
import { Vuetify, VApp, VGrid, transitions } from "vuetify";
import { VFlex, VLayout } from "vuetify/lib";

import { Ripple, Scroll, ClickOutside } from "vuetify/es5/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    transitions,
    VFlex,
    VLayout
  },

  directives: {
    Ripple,
    Scroll,
    ClickOutside
  },

  options: {
    minifyTheme(css) {
      return css.replace(/[\s|\r\n|\r|\n]/g, "");
    }
  },

  theme: {
    primary: "#009EE3",
    secondary: "#009ee3",
    success: "#5EA037",
    warning: "#F5BD41",
    // warning: '#FFF17C',
    error: "#FF6060",
    info: "#4FB6D6",
    grey: "#f5f5f5",
    grey2: "#eeeeee",
    grey3: "#f6f8f7",
    grey4: "#e7e7e7",
    grey5: "#f9f9f9",
    grey6: "#858585"
  }
});
