import auth from './auth';
import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/home-page';
// import Profile from "./views/profile-page";
import Tasks from './views/tasks-page';
import defaultLayout from './layouts/side-nav-outer-toolbar';
// import simpleLayout from "./layouts/single-card";
import DataGrid from './views/data-grid2.vue';
import ProgressionDiagram from './views/progression-diagram.vue';
import DefaultProgressionDiagram from './views/default-progression-diagram.vue';

// function loadView(view) {
//   return () => import(/* webpackChunkName: "login" */ `./views/${view}.vue`)
// }

const router = new createRouter({
  routes: [
    {
      path: '/default-diagram',
      name: 'default diagram',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: DefaultProgressionDiagram,
    },    
    {
      path: '/diagram',
      name: 'diagram',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: ProgressionDiagram,
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   meta: {
    //     requiresAuth: true,
    //     layout: defaultLayout,
    //   },
    //   component: Home,
    // },
    // {
    //   path: '/grid',
    //   name: 'grid',
    //   meta: {
    //     requiresAuth: false,
    //     layout: defaultLayout,
    //   },
    //   component: DataGrid,
    // },
    // {
    //   path: '/tasks',
    //   name: 'tasks',
    //   meta: {
    //     requiresAuth: true,
    //     layout: defaultLayout,
    //   },
    //   component: Tasks,
    // },
    // {
    //   path: "/grid",
    //   name: "datagrid",
    //   meta: {
    //     requiresAuth: false,
    //     layout: defaultLayout
    //   },
    //   component: DataGrid
    // },
    // {
    //   path: "/login-form",
    //   name: "login-form",
    //   meta: {
    //     requiresAuth: false,
    //     layout: simpleLayout,
    //     title: "Sign In"
    //   },
    //   component: loadView("login-form")
    // },
    // {
    //   path: "/reset-password",
    //   name: "reset-password",
    //   meta: {
    //     requiresAuth: false,
    //     layout: simpleLayout,
    //     title: "Reset Password",
    //     description: "Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
    //   },
    //   component: loadView("reset-password-form")
    // },
    // {
    //   path: "/create-account",
    //   name: "create-account",
    //   meta: {
    //     requiresAuth: false,
    //     layout: simpleLayout,
    //     title: "Sign Up"
    //   },
    //   component: loadView("create-account-form"),
    // },
    // {
    //   path: "/change-password/:recoveryCode",
    //   name: "change-password",
    //   meta: {
    //     requiresAuth: false,
    //     layout: simpleLayout,
    //     title: "Change Password"
    //   },
    //   component: loadView("change-password-form")
    // },
    {
      path: '/',
      redirect: '/diagram',
    },
    // {
    //   path: "/recovery",
    //   redirect: "/home"
    // },
    // {
    //   path: "/:pathMatch(.*)*",
    //   redirect: "/home"
    // }
  ],
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login-form' && auth.loggedIn()) {
    next({ name: 'home' });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: 'login-form',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
