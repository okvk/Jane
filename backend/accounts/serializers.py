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
        fields = ('id', 'email', 'username', 'nickname', 'real_name',
                'date_of_birth', 'is_active', 'is_admin', 'joined')



