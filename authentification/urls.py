from django.urls import path
from . import views

urlpatterns = [
    path("get-auth-token", views.get_auth_token, name="get_token"),
    path("get-csrf-token", views.get_csrf_token, name="get_csrf_token"),
]
