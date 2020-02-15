from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)

from utils import errors
from utils.common import StructuredResponse
from utils.decorators import exception_handler_wrapper
from .models import Resource
from .serializers import ResourceSerializer


class ResourceList(GenericAPIView):
    """
    Getting resource list or adding a new resource
    """

    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = ResourceSerializer

    def get(self, request, format=None):
        resources = Resource.objects.filter(owner=request.user)
        serializer = ResourceSerializer(resources, many=True)
        return StructuredResponse(status.HTTP_200_OK, serializer.data)

    @exception_handler_wrapper
    def post(self, request, format=None):
        serializer = ResourceSerializer(data=request.data)
        if serializer.is_valid():
            upload = serializer.validated_data["upload"]
            filename = serializer.validated_data.get("filename", upload.name)
            serializer.save(owner=request.user, filename=filename)
            return StructuredResponse(status.HTTP_201_CREATED, serializer.data)
        else:
            return StructuredResponse(
                status.HTTP_400_BAD_REQUEST,
                error_code=errors.INVALID_INPUT_4001,
                errors=serializer.errors,
            )


class ResourceInstance(GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = ResourceSerializer

    @exception_handler_wrapper
    def get(self, request, pk, format=None):
        resource = Resource.objects.get(id=pk)
        serializer = ResourceSerializer(resource)
        return StructuredResponse(status.HTTP_200_OK, serializer.data)

    @exception_handler_wrapper
    def delete(self, request, pk, format=None):
        resource = Resource.objects.get(id=pk, owner=request.user)
        resource.delete()
        return StructuredResponse(status.HTTP_204_NO_CONTENT)
