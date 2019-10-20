#! /usr/bin/env python
# -*- coding: utf-8 -*-

import re
from rest_framework import serializers

from .models import Article
from tags.models import Tag, TagMap
from tags.serializers import TagSerializer


class ArticleSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    tags_list = serializers.ListField(
        child=serializers.IntegerField(), write_only=True
    )
    tags = serializers.SerializerMethodField()
    author = serializers.ReadOnlyField(source="author.username")
    is_deleted = serializers.ReadOnlyField()
    ctime = serializers.ReadOnlyField()
    mtime = serializers.ReadOnlyField()

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "summary",
            "author",
            "content",
            "raw",
            "is_published",
            "is_sticky",
            "is_deleted",
            "tags_list",
            "tags",
            "ctime",
            "mtime",
        )

    def cleanhtml(self, raw_html):
        cleanr = re.compile("<.*?>")
        cleantext = re.sub(cleanr, "", raw_html)
        return cleantext

    def create(self, validated_data):
        tag_list = validated_data.pop("tags_list")
        if "summary" not in validated_data:
            validated_data["summary"] = self.cleanhtml(
                validated_data["content"][:200]
            )
        article = Article.objects.create(**validated_data)
        for tag in tag_list:
            tag = Tag.objects.get(id=tag)
            tag.counts = tag.counts + 1
            tag.save()
            TagMap.objects.create(tid=tag, aid=article)
        return article

    # Query for article related tags
    def get_tags(self, obj):
        tag_map = TagMap.objects.filter(aid=obj.id).values_list("tid")
        tags = Tag.objects.filter(id__in=tag_map)
        return TagSerializer(tags, many=True).data
