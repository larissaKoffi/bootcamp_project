from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    RegisterView, ProfileView, ImageUploadView,
    PieceIdentiteListView, PieceIdentiteDetailView,
    AdminPieceIdentiteListView, AdminPieceIdentiteValidationView,
    StatsView
)

urlpatterns = [
    # Authentification
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    
    # Gestion des pièces d'identité pour les utilisateurs
    path('pieces/', PieceIdentiteListView.as_view(), name='piece-list'),
    path('pieces/<int:pk>/', PieceIdentiteDetailView.as_view(), name='piece-detail'),
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    
    # Gestion des pièces d'identité pour les administrateurs
    path('admin/pieces/', AdminPieceIdentiteListView.as_view(), name='admin-piece-list'),
    path('admin/pieces/<int:pk>/validate/', AdminPieceIdentiteValidationView.as_view(), name='admin-piece-validate'),
    path('admin/stats/', StatsView.as_view(), name='admin-stats'),
]

# Servir les fichiers médias pendant le développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)