from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models.signals import post_delete
from django.dispatch import receiver


class UserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None):
        """
        Creates and saves a User with the given email, username and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(email=self.normalize_email(email), username=username)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        """
        Creates and saves a superuser with the given email, username and
        password.
        """
        user = self.create_user(email, username=username, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField(
        verbose_name="username", max_length=32, null=True, unique=True
    )
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    nickname = models.CharField(
        verbose_name="nickname", max_length=32, null=True, blank=True
    )
    real_name = models.CharField(
        verbose_name="real name", max_length=32, null=True, blank=True
    )
    date_of_birth = models.DateField(
        verbose_name="birthday", null=True, blank=True
    )
    is_active = models.BooleanField(verbose_name="is active", default=True)
    is_admin = models.BooleanField(verbose_name="is admin", default=False)
    motto = models.CharField(
        verbose_name="motto", max_length=200, null=True, blank=True
    )
    avatar = models.ImageField(
        upload_to=settings.MEDIA_FILE_PREFIX + "/account/photos/%Y/%M",
        null=True,
        blank=True,
    )
    ctime = models.DateTimeField(verbose_name="joined at", auto_now_add=True)
    mtime = models.DateTimeField(verbose_name="updated at", auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        # Return email when username is null
        return self.username or self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


# Delete user photo file after delete user
@receiver(post_delete, sender=User)
def photo_delete_handler(sender, **kwargs):
    user = kwargs["instance"]
    if user.avatar:
        storage, path = user.avatar.storage, user.avatar.path
        storage.delete(path)
