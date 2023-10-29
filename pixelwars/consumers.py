import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import PixelModel
from django.core.cache import cache


class PixelWarsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "pixels"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        pixelArray = await self.get_pixel_array()
        await self.send(
            text_data=json.dumps({"type": "send_array", "pixelArray": pixelArray})
        )

    @database_sync_to_async
    def get_pixel_array(self):
        pixel_data = cache.get("pixel_array_key")
        if pixel_data:
            return pixel_data
        try:
            pixel_data = PixelModel.objects.get()
            return pixel_data.pixelArray
        except PixelModel.DoesNotExist:
            return []

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        new_array = data["pixelArray"]
        await self.set_pixel_array_in_cache(new_array)
        await self.channel_layer.group_send(
            self.group_name, {"type": "send_array", "pixelArray": new_array}
        )

    @database_sync_to_async
    def set_pixel_array_in_cache(self, new_array):
        cache.set("pixel_array_key", new_array, None)

    async def send_array(self, event):
        new_array = event["pixelArray"]
        await self.send(text_data=json.dumps({"pixelArray": new_array}))
