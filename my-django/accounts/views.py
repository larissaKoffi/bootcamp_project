from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data = data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message" : "utilisateur enregistré avec succès",
                "status" : True,
                "data": serializer.data,
            }, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        
        # Vérifier si l'utilisateur existe et si le mot de passe est correct
        user = User.objects.filter(email=email).first()
        
        if user and user.check_password(password):
            # Générer le token d'accès et de rafraîchissement
            refresh = RefreshToken.for_user(user)
            
            # Déterminer le rôle (admin ou user)
            role = 'admin' if user.is_staff else 'user'
            
            # Retourner le token et le rôle, ainsi que l'URL de redirection
            response_data = {
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "role": role,
                "redirect_url": '/admin' if role == 'admin' else '/home'
            }

            return Response(response_data)

        return Response({"message": "Identifiants incorrects"}, status=status.HTTP_400_BAD_REQUEST)

   
        

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self , request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(serializer.data)
    