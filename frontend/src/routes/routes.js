import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import Write from "pages/NewArticle/Write";

const routes = [
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
  },
  {
    path: "/write",
    component: Write
  }
];

export default routes;
