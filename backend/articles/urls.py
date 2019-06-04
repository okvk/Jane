from django.urls import path
from django.conf.urls import include

from . import views

urlpatterns = [
    path("", views.ArticleList.as_view(), name="article_list_new"),
    path("<int:pk>/", views.ArticleInstance.as_view(), name="course_detail"),
    path("tags/", views.TagList.as_view(), name="tag_list_new"),
]
