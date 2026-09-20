import { createApp } from 'vue';
import router from "@/router/router";
import reveal from "@/directives/reveal";

import App from './app/App.vue';

const app = createApp(App);

app.use(router);
app.directive('reveal', reveal);
app.mount('#app');
