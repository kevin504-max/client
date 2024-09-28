import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/dashboard/dashboard',
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard/Home.vue'),
    name: 'Home',
    meta: { requiresAuth: false }, // Requer autenticação
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/views/public/dashboard/Dashboard.vue'),
        name: 'Home',
        meta: { requiresAuth: false },
      },
      {
        path: 'settings',
        component: () => import('../views/dashboard/views/public/settings/Settings.vue'),
        name: 'Settings',
        meta: { requiresAuth: false },
      },
      {
        path: 'admin',
        meta: { requiresAuth: false },
        children: [
          {
            path: 'donations',
            component: () => import('../views/dashboard/views/admin/donations/Donations.vue'),
            name: 'Donations',
            meta: { requiresAuth: false },
          },
          {
            path: 'states',
            component: () => import('../views/dashboard/views/admin/states/States.vue'),
            name: 'States',
            meta: { requiresAuth: false },
          },
          {
            path: 'users',
            component: () => import('../views/dashboard/views/admin/users/Users.vue'),
            name: 'Users',
            meta: { requiresAuth: false },
          },
          {
            path: 'collection_locations',
            component: () => import('../views/dashboard/views/admin/collection_locations/CollectionLocations.vue'),
            name: 'CollectionLocations',
            meta: { requiresAuth: false },
          },
          {
            path: 'cities',
            component: () => import('../views/dashboard/views/admin/cities/Cities.vue'),
            name: 'Cities',
            meta: { requiresAuth: false },
          },
          {
            path: 'types',
            component: () => import('../views/dashboard/views/admin/types/Types.vue'),
            name: 'Types',
            meta: { requiresAuth: false },
          },
        ],
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
