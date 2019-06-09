import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import NewArticle from "pages/Articles/NewArticle";
import ArticlePage from "pages/Articles/ArticlePage";
import ArticleList from "pages/Articles/ArticleList";

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
    path: "/articles/",
    component: ArticleList
  },
  {
    path: "/articles/:articleId",
    component: ArticlePage
  }
];

export default routes;
