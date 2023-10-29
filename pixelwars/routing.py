from django.urls import re_path 
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/pixels/(?P<game_id>\d+)/$", consumers.PixelWarsConsumer.as_asgi()),
]