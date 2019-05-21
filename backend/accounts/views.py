from django.shortcuts import render
from django.contrib.auth import (
    authenticate,
    login as django_login,
    logout as django_logout,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.settings import api_settings
from utils.common import ResponseObject
from utils.decorators import construct_response
from .serializers import UserSerializer, LoginSerializer

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class Login(GenericAPIView):
    permission_classes = (AllowAny,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = LoginSerializer

    @construct_response
    def post(self, request, format=None):
        """
        User login, identifier can either be username, or email
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"],
            )
            if user is not None:
                if user.is_active:
                    django_login(request, user)
                    payload = jwt_payload_handler(user)
                    token = jwt_encode_handler(payload)
                    serializer = UserSerializer(user)
                    context = {"token": token, "user": serializer.data}
                    return ResponseObject(context, status.HTTP_200_OK)
                else:
                    msg = "The current account is disactived"
                    return ResponseObject(
                        None,
                        status.HTTP_400_BAD_REQUEST,
                        {"non_field_errors": msg},
                    )
            else:
                msg = "Incorrect email address and / or password."
                return ResponseObject(
                    None,
                    status.HTTP_400_BAD_REQUEST,
                    {"non_field_errors": msg},
                )
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)

    @construct_response
    def post(self, request, format=None):
        django_logout(request)
        return ResponseObject({}, status.HTTP_200_OK)
