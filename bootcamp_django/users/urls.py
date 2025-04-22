from django.urls import path
from .views import UserList, IdentityDocumentList

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('documents/', IdentityDocumentList.as_view(), name='identity-document-list'),
]


