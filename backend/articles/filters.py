#! /usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework.filters import BaseFilterBackend
import coreapi


class TagFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            coreapi.Field(name="name", location="query", required=False, type="string")
        ]


class ArticleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            coreapi.Field(name="num", location="query", required=False, type="int"),
            coreapi.Field(name="page", location="query", required=False, type="int"),
            coreapi.Field(
                name="is_published", location="query", required=False, type="string"
            ),
            coreapi.Field(
                name="keyword", location="query", required=False, type="string"
            ),
            coreapi.Field(
                name="scoped", location="query", required=False, type="string"
            ),
            coreapi.Field(name="tag", location="query", required=False, type="string"),
        ]
