import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  console.clear();
  console.log(`content-script/main.js Loaded!`);
}

const root = document.createElement(`div`);
root.setAttribute(`id`, `test-extension-root`);
document.body.appendChild(root);
createApp(App).use(createPinia()).use(router).mount(`#test-extension-root`);
