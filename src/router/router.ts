import {createRouter, createWebHistory} from 'vue-router';
import App from "@/app/App.vue";

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      name: 'main',
      path: '/',
      component: App,
      children: [],
      props: true,
      meta: {
        title: 'Приглашение на свадьбу — Ярослава и Александры'
      }
    }
  ]
});

router.afterEach((to, from) => {
  if (to.name === from.name) return;

  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }

  // Безопасное обновление description
  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (to.meta.description && typeof to.meta.description === 'string' && descriptionMeta) {
    descriptionMeta.setAttribute('content', to.meta.description)
  }

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, 250);
});

export default router;
