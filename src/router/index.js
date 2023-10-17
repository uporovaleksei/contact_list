import { createRouter, createWebHistory } from "vue-router";
import ContactList from "../views/ContactList.vue";
import NewContact from "@/views/NewContact.vue";
import CurrentContact from "@/views/CurrentContact.vue";

const routes = [
  {
    path: "/",
    name: "ContactList",
    component: ContactList,
  },
  {
    path: "/new_contact",
    name: "NewContact",
    component: NewContact,
  },
  {
    path: "/current_contact/:id",
    name: "CurrentContact",
    component: CurrentContact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
