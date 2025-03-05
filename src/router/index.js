import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ConnectionForm from "@/components/ConnectionForm.vue";
import EntitySelector from "@/components/EntitySelector.vue";
import RepairJobs from "@/views/RepairJobs.vue"; // Import RepairJobs component

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/connection",
    name: "Connection",
    component: ConnectionForm,
  },
  {
    path: "/entities",
    name: "Entities",
    component: EntitySelector,
  },
  {
    path: "/entities/repairJobs",
    name: "EntityDetail",
    component: RepairJobs, 
  },
  {
    path: "/entities/repairJobs",
    name: "EntityDetail",
    component: RepairJobs, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
