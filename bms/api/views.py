from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, logout

from books import models as books_model
from . import serializers


class Register(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = books_model.User.objects.all()
    serializer_class = serializers.UserRegisterSerializer
    permission_classes = [AllowAny, ]

    def create(self, request):
        serializer = serializers.UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            try:
                # Add refresh token
                user = books_model.User.objects.get(
                    email=request.data["email"])
                refresh_token = user.refresh_token
                user.refresh_tokens = refresh_token
                user.save()
            except (Exception, books_model.User.DoesNotExist) as e:
                pass

            # Response data
            data = {
                'id': user.id,
                'email': user.email,
                'fullName': user.get_full_name(),
                "accessToken": user.access_token,
                "refreshToken": refresh_token
            }
            return Response({"status": True, "data": data}, status=200)
        else:
            return Response({"status": False, "data": {"message": "Sign up Failed."}}, status=401)


class Login(mixins.CreateModelMixin,
            viewsets.GenericViewSet):
    serializer_class = serializers.LoginSerializer
    permission_classes = [AllowAny, ]

    @csrf_exempt
    def create(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data["email"]
            password = request.data["password"]
            try:
                check = books_model.User.objects.get(email=email)
                user = authenticate(
                    request, email=request.data["email"], password=request.data["password"])
                # user = api_models.User.objects.get(email=email)
            except books_model.User.DoesNotExist:
                return Response({"status": False, "data": {"message": "Invalid credentials."}}, status=401)
            if user:
                token = user.refresh_token
                if user.refresh_tokens:
                    refresh_tokens = user.refresh_tokens + "," + token
                else:
                    refresh_tokens = token
                user.refresh_tokens = refresh_tokens
                user.save()
                data = {
                    "id": user.id,
                    "email": user.email,
                    "fullName": user.get_full_name(),
                    "accessToken": user.access_token,
                    "refreshToken": token
                }
                return Response({"status": True, "data": data}, status=200)
            else:
                return Response({"status": False, "data": {"message": "Invalid credentials"}}, status=400)
        else:
            return Response({"status": False, "data": {"message": "Invalid credentials"}}, status=400)


class Books(mixins.CreateModelMixin,
            mixins.ListModelMixin,
            mixins.RetrieveModelMixin,
            viewsets.GenericViewSet):
    queryset = books_model.Books.objects.all()
    serializer_class = serializers.BooksSerializer
    permission_classes = [AllowAny, ]

    def list(self, request):
        all_books = books_model.Books.objects.all().order_by('?')
        books = []
        all_books = books_model.Books.objects.prefetch_related('author').all()
        for book in all_books:
            books.append({
                'id': book.id,
                'title': book.title,
                'author': [{"name": i.fullName, "id": i.id} for i in book.author.all()],
                'image': book.image.url
            })
        return Response({"status": True, "data": books}, status=200)

    def retrieve(self, request, pk):
        try:
            book = books_model.Books.objects.get(pk=pk)
            data = {
                "id": book.id,
                "title": book.title,
                "grade": book.grade,
                "author": [{"name": i.fullName, "id": i.id} for i in book.author.all()],
                "subject": book.subject.name,
                "chapter": book.chapter,
                "byUser": book.user.email,
                "image": book.image.url
            }
            return Response({"status": True, "data": data}, status=200)
        except (Exception, books_model.Books.DoesNotExist) as e:
            print(e)
            return Response({"status": False, "data": {"message": "Data not found"}}, status=401)
