from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PieceIdentite

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class PieceIdentiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PieceIdentite
        fields = ['id', 'user', 'type_piece', 'image', 'date_soumission', 
                  'numero', 'nom', 'prenoms', 'date_naissance', 'date_expiration',
                  'statut', 'commentaire_validation', 'date_validation']
        read_only_fields = ['date_soumission', 'statut', 'date_validation']

class PieceIdentiteUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PieceIdentite
        fields = ['type_piece', 'image']

class PieceIdentiteValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PieceIdentite
        fields = ['id', 'statut', 'commentaire_validation']

class PieceIdentiteDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PieceIdentite
        fields = ['id', 'user', 'type_piece', 'image', 'date_soumission', 
                  'numero', 'nom', 'prenoms', 'date_naissance', 'date_expiration',
                  'statut', 'commentaire_validation', 'date_validation']