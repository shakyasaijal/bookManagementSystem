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


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = books_model.Author
        fields = '__all__'


class BooksSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=False)
    grade = serializers.IntegerField(required=False)
    subject = serializers.RelatedField(
        source='books_model.Subject', read_only=True)
    chapter = serializers.CharField(required=False)
    user = serializers.RelatedField(source='books_model.User', read_only=True)
    image = serializers.ImageField(required=False)
    author = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = books_model.Books
        fields = '__all__'


class CreateBooks(serializers.ModelSerializer):
    # user = UserRegisterSerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    image = serializers.ImageField(required=True)
    class Meta:
        fields = ('title', 'grade', 'chapter', 'author', 'image')
        model = books_model.Books


class Logout(serializers.Serializer):
    refreshToken = serializers.CharField(required=True)
    accessToken = serializers.CharField(required=True)