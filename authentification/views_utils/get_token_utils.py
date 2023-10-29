import requests
from django.http import JsonResponse
import json
import creds


def request_error():
    error_message = "Invalid request method."
    return JsonResponse({"error": error_message}, status=405)


def set_data(authorization_code):
    return {
        "grant_type": "authorization_code",
        "client_id": creds.client_id,
        "client_secret": creds.client_secret,
        "code": authorization_code,
        "redirect_uri": "http://localhost:5173/",
    }


def make_token_exchange(request):
    post_data = json.loads(request.body.decode("utf-8"))
    authorization_code = post_data.get("code")
    data = set_data(authorization_code)
    token_response = requests.post("https://api.intra.42.fr/oauth/token", data=data)
    print(token_response)
    return token_response


def success_request(token_response):
    response_data = token_response.json()
    access_token = response_data.get("access_token")
    return JsonResponse({"access_token": access_token})


def failed_request():
    error_message = "Token exchange failed."
    return JsonResponse({"error": error_message}, status=400)
