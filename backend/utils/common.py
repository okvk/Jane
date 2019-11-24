#! /usr/bin/env python
# -*- coding: utf-8 -*-
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.response import Response

from utils import errors as errors_config


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

    def __init__(
        self,
        http_code,
        data=None,
        error_code=None,
        errors=None,
        template_name=None,
        headers=None,
        content_type=None,
    ):
        # When there are any general validation errors in serializers,
        # non_field_errors is being used as key.
        # see `https://www.django-rest-framework.org/api-guide/serializers/#validation`
        # for more detail
        if errors is not None and "non_field_errors" in errors:
            errors[errors_config.MSG] = errors["non_field_errors"]
            del errors["non_field_errors"]
        self.data = {"error_code": error_code, "errors": errors}
        if data is not None:
            self.data["data"] = data
        super().__init__(
            self.data, http_code, template_name, headers, content_type
        )
