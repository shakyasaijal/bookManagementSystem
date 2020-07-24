from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

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
                user = books_model.User.objects.get(email=request.data["email"])
                refresh_token = user.refresh_token
                user.refresh_tokens = refresh_token
                user.save()
            except (Exception, books_model.User.DoesNotExist) as e:
                pass
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
            
