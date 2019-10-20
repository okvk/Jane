from django.urls import path

from . import views

urlpatterns = [
    path("", views.ResourceList.as_view(), name="resource-list-new"),
    path(
        "<str:pk>/", views.ResourceInstance.as_view(), name="resource-detail"
    ),
]
