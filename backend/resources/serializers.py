# -*- coding: utf-8 -*-

"""
Resource  module serializers
: Validation of User's upload files
"""
from rest_framework import serializers
from PIL import Image

from .models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source="owner.id")
    ctime = serializers.ReadOnlyField()

    class Meta:
        model = Resource
        fields = ("id", "filename", "filetype", "upload", "owner", "ctime")

    # def validate_upload(self, value):
    #    print(upload)
    #    return value

    def validate(self, attrs):
        if attrs["filetype"] == "IMAGE":
            try:
                im = Image.open(attrs["upload"])
                im.verify()
            except IOError:
                raise serializers.ValidationError("Invalid Image File")
            # Do image Resize here
        elif attrs["filetype"] == "ATTACHMENT":
            pass
            # Do file compression here
        return attrs
