from django.db import models

# Create your models here.
class CustomUser(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()

    def __str__(self):
        return self.email

class IdentityDocument(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    document_type = models.CharField(max_length=50)
    document_number = models.CharField(max_length=50)
    expiration_date = models.DateField()
    image = models.ImageField(upload_to='identity_images/')
    validated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.document_type} - {self.document_number}"