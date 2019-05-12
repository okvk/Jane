import { Home } from "pages/Home";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";

export const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
];
