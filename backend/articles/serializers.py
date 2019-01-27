#! /usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers
from .models import Article, Tag, TagMap

class ArticleSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    tags_list = serializers.ListField(
        child=serializers.IntegerField(), write_only=True        
    )
    author = serializers.ReadOnlyField(source='user.username')
    created = serializers.ReadOnlyField()

    class Meta:
        model = Article
        fields = ('id', 'name', 'tags_list', 'author', 'created')
    
    def create(slef, validated_data):
        tag_list = validated_data.pop('tags_list')
        article = Article.objects.create(**validated_data)
        for tag in tag_list:
            tag = Tag.objects.get(id=tag)
            tag.counts = tag.counts + 1
            tag.save()
            TagMap.objects.create(tid=tag, aid=article)
        return article


class TagSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()

    class Meta:
        model = Tag
        fields = ('id', 'name', 'description', 'counts', 'created')

