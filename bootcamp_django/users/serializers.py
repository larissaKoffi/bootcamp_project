from rest_framework import serializers
from .models import CustomUser, IdentityDocument

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'date_of_birth']

class IdentityDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentityDocument
        fields = ['user', 'document_type', 'document_number', 'expiration_date', 'image', 'validated']
