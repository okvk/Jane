from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly

from .models import Article, Tag
from .filters import TagFilterBackend
from .serializers import ArticleSerializer, TagSerializer

class TagList(GenericAPIView):
    """
    Getting tag list or adding a new tag
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    queryset = Tag.objects.all().order_by('-counts')
    filter_backends = (TagFilterBackend,)
    serializer_class = TagSerializer

    def get(self, request, format=None):
        name = request.GET.get('name')
        if name:
            tags = self.get_queryset().filter(name__contains=name)
        else:
            tags = self.get_queryset()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticleList(GenericAPIView):
    """
    Getting Article list or adding a new Article
    """
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)

    def get(self, request, format=None):
        articles = self.get_queryset()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
