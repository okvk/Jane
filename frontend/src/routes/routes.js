import { ArticlePages, Home, Login, Register, Tags } from "pages";

const { ArticleDetail, ArticleList, NewArticle } = ArticlePages;

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
