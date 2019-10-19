import { ArticlePages, Home, Login, Register, Tags } from "pages";

const { ArticleDetail, ArticleList, NewArticle } = ArticlePages;

const routes = [
  {
    path: "/",
    exact: true,
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
    path: "/:username/articles/:articleId",
    component: ArticleDetail
  },
  {
    path: "/:username/articles",
    component: ArticleList
  },
  {
    path: "/:username/tags",
    component: Tags
  },
  {
    path: "/:username",
    component: ArticleList
  }
];

export default routes;
