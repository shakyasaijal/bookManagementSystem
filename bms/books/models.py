from django.db import models
from helper import models as models_helper
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin, UserManager)
from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone
import jwt
import yaml
from datetime import datetime, timedelta

credentials = yaml.load(open("credentials.yaml"), Loader=yaml.FullLoader)


class UserManager(BaseUserManager):

    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        user = self._create_user(email, password, True, True, **extra_fields)
        return user

        
class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    refresh_tokens = models.TextField(blank=True, null=True)


    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_full_name(self):
        full_name = None
        if self.first_name or self.last_name:
            full_name = self.first_name + " " + self.last_name
        else:
            full_name = self.email
        return full_name

    def __str__(self):
        return self.email

    @property
    def access_token(self):
        exp = str(datetime.now() + timedelta(hours=1))
        return self._generate_jwt_token(exp, 'access')

    @property
    def refresh_token(self):
        exp = str(datetime.now() + timedelta(days=15))
        return self._generate_jwt_token(exp, 'refresh')

    def _generate_jwt_token(self, exp, scope):
        """
        Generates a JSON Web Token that stores user's email and has an expiry
        date set to exp sent.
        """

        token = jwt.encode({'email': self.email, 'expires': exp, 'scope': scope},
                           credentials['jwt_secret'], algorithm='HS256')

        return token.decode('utf-8')

    class Meta:
        ordering = ['-is_active']


class Author(models.Model):
    fullName = models.CharField(max_length=255, null=False, blank=False, unique=True)
    email = models.EmailField(null=False, blank=False, unique=True)

    def __str__(self):
        return self.fullName

    class Meta:
        verbose_name = "Author"
        verbose_name_plural = "Authors"


class Subject(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"


class Books(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    grade = models.IntegerField(choices=models_helper.grades_choice, null=False, blank=False, default=1)
    author = models.ManyToManyField(Author, related_name="author_books", blank=False)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT, null=False, blank=False)
    chapter = models.CharField(max_length=255, null=False, blank=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Book"
        verbose_name_plural = "Books"
