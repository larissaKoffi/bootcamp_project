# users/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class PieceIdentite(models.Model):
    STATUT_CHOICES = [
        ('SOUMIS', 'Soumis'),
        ('VALIDÉ', 'Validé'),
        ('REJETÉ', 'Rejeté')
    ]
    TYPE_CHOICES = [
        ('CNI', 'Carte Nationale d\'Identité'),
        ('PASSPORT', 'Passeport'),
        ('PERMIS', 'Permis de conduire')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pieces')
    type_piece = models.CharField(max_length=100, choices=TYPE_CHOICES)
    image = models.ImageField(upload_to='pieces_identite/')
    date_soumission = models.DateTimeField(auto_now_add=True)
    
    # Données extraites par OCR
    numero = models.CharField(max_length=100, blank=True)
    nom = models.CharField(max_length=100, blank=True)
    prenoms = models.CharField(max_length=200, blank=True)
    date_naissance = models.CharField(max_length=20, blank=True)
    date_expiration = models.CharField(max_length=20, blank=True)
    
    # Statut de validation
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES, default='SOUMIS')
    commentaire_validation = models.TextField(blank=True)
    date_validation = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.type_piece} - {self.user.username}"