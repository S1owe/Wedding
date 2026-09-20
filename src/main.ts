import { createApp } from 'vue';
import router from "@/router/router";
import reveal from "@/directives/reveal";
import chapter from "@/directives/chapter";

import App from './app/App.vue';

const app = createApp(App);

app.use(router);
app.directive('reveal', reveal);
app.directive('chapter', chapter);
app.mount('#app');
