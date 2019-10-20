from django.urls import path

from . import views

urlpatterns = [
    path("", views.ResourceList.as_view(), name="resource-list-new"),
    # path("<int:pk>/", views.ArticleInstance.as_view(), name="article-detail"),
]
