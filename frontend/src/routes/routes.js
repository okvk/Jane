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
    path: "/:username",
    component: ArticleList,
    routes: [
      {
        path: "/:username/articles",
        component: ArticleList,
        routes: [
          {
            path: "/:username/articles/:articleId",
            component: ArticleDetail
          }
        ]
      },
      {
        path: "/:username/tags",
        component: Tags
      }
    ]
  }
];

export default routes;
