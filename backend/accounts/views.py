from django.shortcuts import render
from django.contrib.auth import logout as django_logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
from .serializers import UserSerializer

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


class Logout(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)

    def post(self, request, format=None):
        django_logout(request)
        return Response({}, status.HTTP_200_OK)


