#! /usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework.filters import BaseFilterBackend
import coreapi


class UserFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            coreapi.Field(
                name="username", location="query", required=True, type="string"
            )
        ]
