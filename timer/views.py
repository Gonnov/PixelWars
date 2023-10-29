from django.shortcuts import render
from django.http import JsonResponse
from django.core.cache import cache
from datetime import datetime, timedelta


def start_timer(request):
    user = request.GET.get("user")
    cache_key = f"user_timer_{user}"
    if cache.get(cache_key):
        return JsonResponse({"status": "Timer already started"})
    expiration_time = datetime.now() + timedelta(seconds=179)
    cache.set(cache_key, expiration_time, 180)
    return JsonResponse({"status": "Timer started"})


def timer_status(request):
    user = request.GET.get("user")
    cache_key = f"user_timer_{user}"
    expiration_time = cache.get(cache_key)
    if expiration_time == None:
        return JsonResponse({"time_left": 0})
    time_left = max(0, (expiration_time - datetime.now()).total_seconds())
    return JsonResponse({"time_left": round(time_left)})
