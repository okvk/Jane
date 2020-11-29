from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)

from utils import errors
from utils.common import paginate_data, StructuredResponse
from utils.decorators import exception_handler_wrapper
from .models import Article
from .filters import TagFilterBackend, ArticleFilterBackend
from .serializers import ArticleSerializer, TagSerializer
from tags.models import Tag, TagMap


class TagList(GenericAPIView):
    """
    Getting tag list or adding a new tag
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    queryset = Tag.objects.all().order_by("-counts")
    filter_backends = (TagFilterBackend,)
    serializer_class = TagSerializer

    def get(self, request, format=None):
        name = request.GET.get("name")
        if name:
            tags = self.get_queryset().filter(name__contains=name)
        else:
            tags = self.get_queryset()
        serializer = TagSerializer(tags, many=True)
        return StructuredResponse(status.HTTP_200_OK, serializer.data)

    @exception_handler_wrapper
    def post(self, request, format=None):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return StructuredResponse(status.HTTP_201_CREATED, serializer.data)
        else:
            return StructuredResponse(
                status.HTTP_400_BAD_REQUEST,
                error_code=errors.BAD_REQUEST_4000,
                errors=serializer.errors,
            )


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
            if self.request.GET.get("scoped", False):
                articles = articles.filter(author=user)
        keyword = self.request.GET.get("keyword", False)
        is_published = self.request.GET.get("is_published", True)
        username = self.request.GET.get("username", False)
        if username:
            articles = articles.filter(author__username=username)
        if keyword:
            articles = articles.filter(title__contains=username)
        # Filter by tag
        tag = self.request.GET.get("tag", False)
        if tag:
            articleList = TagMap.objects.filter(tid__id=tag).values_list(
                "aid", flat=True
            )
            articles = articles.filter(id__in=articleList)
        articles = articles.filter(is_published=is_published)
        return articles

    @exception_handler_wrapper
    def get(self, request, format=None):
        articles = self.get_queryset()
        context = paginate_data(request, articles, ArticleSerializer)
        return StructuredResponse(status.HTTP_200_OK, context)

    @exception_handler_wrapper
    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return StructuredResponse(status.HTTP_201_CREATED, serializer.data)
        else:
            return StructuredResponse(
                status.HTTP_400_BAD_REQUEST,
                error_code=errors.BAD_REQUEST_4000,
                errors=serializer.errors,
            )


class ArticleInstance(GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    serializer_class = ArticleSerializer

    @exception_handler_wrapper
    def get(self, request, pk, format=None):
        article = Article.objects.get(id=pk)
        serializer = ArticleSerializer(article)
        return StructuredResponse(status.HTTP_200_OK, serializer.data)

    @exception_handler_wrapper
    def put(self, request, pk, format=None):
        article = Article.objects.get(id=pk, author=request.user)
        serializer = ArticleSerializer(
            article, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return StructuredResponse(status.HTTP_200_OK, serializer.data)
        else:
            return StructuredResponse(
                status.HTTP_400_BAD_REQUEST,
                error_code=errors.BAD_REQUEST_4000,
                errors=serializer.errors,
            )

    @exception_handler_wrapper
    def delete(self, request, pk, format=None):
        article = Article.objects.get(id=pk, author=request.user)
        article.is_deleted = True
        article.save()
        return StructuredResponse(status.HTTP_204_NO_CONTENT)
