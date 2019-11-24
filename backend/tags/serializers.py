#! /usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers
from .models import Tag, TagMap


class TagSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    ctime = serializers.ReadOnlyField()

    class Meta:
        model = Tag
        fields = ("id", "name", "description", "counts", "ctime")
