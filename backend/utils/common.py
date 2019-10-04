#! /usr/bin/env python
# -*- coding: utf-8 -*-
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.response import Response


def paginate_data(request, data_set, data_serializer):
    context = {}
    page = request.GET.get("page", 1)
    num = request.GET.get("num", 100)
    # Return all items in data set
    if num == 0:
        num = data_set.count()
    paginator = Paginator(data_set, num)
    try:
        data_set = paginator.page(page)
    except PageNotAnInteger:
        data_set = paginator.page(1)
    except EmptyPage:
        data_set = paginator(paginator.num_pages)
    serializer = data_serializer(data_set, many=True)
    context["records"] = serializer.data
    context["count"] = paginator.count
    context["num_pages"] = paginator.num_pages
    return context


class StructuredResponse(Response):
    """
    Restructure DRF Response
    """

    def __init__(self, data, http_code, error_code=None, errors=None,
                 template_name=None, headers=None, content_type=None):
        self.data = {
            "data": data,
            "error_code": error_code,
            "errors": errors
        }
        super().__init__(self.data, http_code, template_name, headers,
                         content_type)
