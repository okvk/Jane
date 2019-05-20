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
            "real_name",
            "date_of_birth",
            "is_active",
            "is_admin",
            "joined",
        )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True, max_length=100, label="username/email"
    )
    password = serializers.CharField(
        required=True, max_length=50, style={"input_type": "password"}, label="password"
    )
