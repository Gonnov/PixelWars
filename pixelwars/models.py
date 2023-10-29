from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.dispatch import receiver 

lineNumber = 40
columnNumber = 20

def getPixelArray():
    pixelArray = []
    for i in range(lineNumber):
        row = []
        for y in range(columnNumber):
            row.append('bg-white')
        pixelArray.append(row)
    return pixelArray

class PixelModel(models.Model):
    pixelArray = ArrayField(
        ArrayField(models.CharField(max_length=30, blank=True), size=columnNumber),
        size=lineNumber,
        default=getPixelArray
    )
 
