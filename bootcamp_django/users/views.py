from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, IdentityDocument
from .serializers import UserSerializer, IdentityDocumentSerializer

class UserList(APIView):
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class IdentityDocumentList(APIView):
    def get(self, request):
        documents = IdentityDocument.objects.all()
        serializer = IdentityDocumentSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IdentityDocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

