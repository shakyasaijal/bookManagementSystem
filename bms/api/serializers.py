from rest_framework import serializers
from books import models as books_model


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('first_name', 'last_name', 'email', 'password')
        model = books_model.User

    def create(self, validated_data):
        user = books_model.User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for login endpoint.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class BooksSerializer(serializers.Serializer):
    pass