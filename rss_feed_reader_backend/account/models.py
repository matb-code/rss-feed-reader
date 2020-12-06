from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, display_name, password):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')

        if not display_name:
            raise ValueError('The display name must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, display_name = display_name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, display_name, password):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

# Create your models here.
class Account(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    display_name = models.CharField(max_length=30,unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['display_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)