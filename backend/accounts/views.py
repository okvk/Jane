from django.contrib.auth import (
    authenticate,
    login as django_login,
    logout as django_logout,
)
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.settings import api_settings

from utils import errors
from utils.common import StructuredResponse
from utils.decorators import exception_handler_wrapper
from .serializers import UserSerializer, UserInfoSerializer, LoginSerializer
from .filters import UserFilterBackend
from .models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserInfo(GenericAPIView):
    permission_classes = (AllowAny,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = UserInfoSerializer
    filter_backends = (UserFilterBackend,)

    @exception_handler_wrapper
    def get(self, request, format=None):
        """
        Get User Basic Info
        """
        username = request.GET.get("username")
        try:
            user = User.objects.get(username=username)
            serializer = self.get_serializer_class()(user)
            return StructuredResponse(status.HTTP_200_OK, serializer.data)
        except User.DoesNotExist as e:
            return StructuredResponse(
                status.HTTP_404_NOT_FOUND,
                error_code=errors.USER_NOT_FOUND_4041,
                errors={errors.MSG: str(e)},
            )


class Login(GenericAPIView):
    permission_classes = (AllowAny,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = LoginSerializer

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
                    return StructuredResponse(status.HTTP_200_OK, context)
                else:
                    return StructuredResponse(
                        status.HTTP_404_NOT_FOUND,
                        error_code=errors.USER_INACTIVE_4042,
                        errors={errors.MSG: errors.USER_INACTIVE_4042_MSG},
                    )
            else:

                return StructuredResponse(
                    status.HTTP_400_BAD_REQUEST,
                    error_code=errors.WRONG_CREDENTIALS_4002,
                    errors={errors.MSG: errors.WRONG_CREDENTIALS_4002_MSG},
                )
        else:
            return StructuredResponse(
                status.HTTP_400_BAD_REQUEST,
                error_code=errors.BAD_REQUEST_4000,
                errors=serializer.errors,
            )


class Logout(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)

    def post(self, request, format=None):
        django_logout(request)
        return StructuredResponse(status.HTTP_200_OK)
