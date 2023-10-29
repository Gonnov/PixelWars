from django.urls import path, include
from . import views

urlpatterns = [
    path("start_timer/", views.start_timer, name="start_timer"),
    path("timer_status/", views.timer_status, name="timer_status"),
]
