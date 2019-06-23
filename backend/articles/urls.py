from django.urls import path

from . import views

urlpatterns = [
    path("", views.ArticleList.as_view(), name="article-list-new"),
    path("<int:pk>/", views.ArticleInstance.as_view(), name="article-detail"),
    path("tags/", views.TagList.as_view(), name="tag-list-new"),
]
