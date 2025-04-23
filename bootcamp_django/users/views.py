from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils import timezone
from .models import PieceIdentite
from .serializers import (
    RegisterSerializer, UserSerializer, PieceIdentiteSerializer, 
    PieceIdentiteUploadSerializer, PieceIdentiteValidationSerializer,
    PieceIdentiteDetailSerializer
)
from .ocr_utils import extraire_info_piece

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class ImageUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = PieceIdentiteUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            # Sauvegarder l'image temporairement
            piece = serializer.save(user=request.user)
            
            try:
                # Extraire les informations via OCR
                resultats, validations = extraire_info_piece(piece.image.path)
                
                # Mettre à jour l'objet avec les informations extraites
                piece.type_piece = resultats["type_piece"]
                piece.numero = resultats["numero"]
                piece.nom = resultats["nom"]
                piece.prenoms = resultats["prenoms"]
                piece.date_naissance = resultats["date_naissance"]
                piece.date_expiration = resultats["date_expiration"]
                piece.save()
                
                # Retourner les résultats avec validations
                return Response({
                    "piece_id": piece.id,
                    "resultats": resultats,
                    "validations": validations
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                # En cas d'erreur, supprimer l'objet créé
                piece.delete()
                return Response({
                    "error": f"Erreur lors de l'extraction des données: {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PieceIdentiteListView(generics.ListAPIView):
    """Liste des pièces d'identité pour l'utilisateur connecté"""
    serializer_class = PieceIdentiteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PieceIdentite.objects.filter(user=self.request.user)

class PieceIdentiteDetailView(generics.RetrieveAPIView):
    """Détail d'une pièce d'identité spécifique"""
    serializer_class = PieceIdentiteDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PieceIdentite.objects.filter(user=self.request.user)

class AdminPieceIdentiteListView(generics.ListAPIView):
    """Liste des pièces d'identité pour les administrateurs"""
    serializer_class = PieceIdentiteDetailSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = PieceIdentite.objects.all()

class AdminPieceIdentiteValidationView(generics.UpdateAPIView):
    """Vue pour valider ou rejeter une pièce d'identité (admin uniquement)"""
    serializer_class = PieceIdentiteValidationSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = PieceIdentite.objects.all()
    
    def perform_update(self, serializer):
        serializer.save(date_validation=timezone.now())

class StatsView(APIView):
    """Vue pour obtenir des statistiques sur les pièces d'identité"""
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        # Statistiques générales
        total = PieceIdentite.objects.count()
        validees = PieceIdentite.objects.filter(statut='VALIDÉ').count()
        rejetees = PieceIdentite.objects.filter(statut='REJETÉ').count()
        en_attente = PieceIdentite.objects.filter(statut='SOUMIS').count()
        
        # Statistiques par type de pièce
        types = {}
        for type_choice in PieceIdentite.TYPE_CHOICES:
            type_code = type_choice[0]
            count = PieceIdentite.objects.filter(type_piece=type_code).count()
            types[type_code] = count
        
        return Response({
            "total": total,
            "validees": validees,
            "rejetees": rejetees,
            "en_attente": en_attente,
            "types": types
        })