from django.views.decorators.csrf import csrf_exempt
import authentification.views_utils.get_token_utils as token_utils
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


@ensure_csrf_cookie
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})


@csrf_exempt
def get_auth_token(request):
    if request.method != "POST":
        return token_utils.request_error()
    token_response = token_utils.make_token_exchange(request)
    if token_response.status_code == 200:
        return token_utils.success_request(token_response)
    else:
        return token_utils.failed_request()
