import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/root.css";
import VueTheMask from "vue-the-mask";

const pinia = createPinia();
createApp(App).use(router).use(VueTheMask).use(pinia).mount("#app");
