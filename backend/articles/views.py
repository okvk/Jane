from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly

from utils.common import paginate_data
from .models import Article, Tag, TagMap
from .filters import TagFilterBackend, ArticleFilterBackend
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
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    filter_backends = (ArticleFilterBackend,)
    serializer_class = ArticleSerializer

    def get_queryset(self):
        user = self.request.user
        articles = Article.objects.filter(is_deleted=False)
        if user.is_authenticated:
            if self.request.GET.get('scoped', False):
                articles = articles.filter(author=user)
        keyword = self.request.GET.get('keyword', False)
        is_published = self.request.GET.get('is_published', True)
        if keyword:
            articles = articles.filter(title__contains=keyword)
        # Filter by tag
        tag = self.request.GET.get('tag', False)
        if tag:
            articleList = TagMap.objects.filter(tid__id=tag).values_list('aid', flat=True)
            articles = articles.filter(id__in=articleList)
        articles = articles.filter(is_published=is_published)
        return articles

    def get(self, request, format=None):
        articles = self.get_queryset()
        context = paginate_data(request, articles, ArticleSerializer)
        return Response(context, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticleInstance(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = ArticleSerializer

    def get(self, request, pk, format=None):
        article = Article.objects.get(id=pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        article = Article.objects.get(id=pk, author=request.user)
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        article = Article.objects.get(id=pk, author=request.user)
        article.is_deleted = True
        article.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)
