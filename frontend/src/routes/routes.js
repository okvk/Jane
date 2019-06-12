import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import NewArticle from "pages/Articles/NewArticle";
import ArticleDetail from "pages/Articles/ArticleDetail";
import ArticleList from "pages/Articles/ArticleList";
import Tags from "pages/Tags/Tags";

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
    component: NewArticle
  },
  {
    path: "/:username/articles/",
    component: ArticleList
  },
  {
    path: "/:username/tags/",
    component: Tags
  },
  {
    path: "/:username/articles/:articleId",
    component: ArticleDetail
  }
];

export default routes;
