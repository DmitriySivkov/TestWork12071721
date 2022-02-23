const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "Index", component: () => import("pages/Index.vue") },
      { path: "/task/create", name: "createTask", component: () => import("src/components/tasks/CreateTask") },
      { path: "/task/:id/update", name: "updateTask", component: () => import("src/components/tasks/UpdateTask") }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
