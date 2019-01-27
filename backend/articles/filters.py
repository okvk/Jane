#! /usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework.filters import BaseFilterBackend
import coreapi

class TagFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [coreapi.Field(
            name='name',
            location='query',
            required=False,
            type='string'
        )]
