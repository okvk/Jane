# -*- coding: utf-8 -*-

"""
User account module serializers
"""
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "nickname",
            "motto",
            "real_name",
            "date_of_birth",
            "is_active",
            "is_admin",
            "avatar",
            "joined",
        )


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "nickname", "motto", "avatar")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True, max_length=100, label="username/email"
    )
    password = serializers.CharField(
        required=True,
        max_length=50,
        style={"input_type": "password"},
        label="password",
    )
