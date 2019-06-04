from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


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
    email = models.EmailField(verbose_name="邮箱", max_length=255, unique=True)
    username = models.CharField(
        verbose_name="用户名", max_length=32, null=True, unique=True
    )
    nickname = models.CharField(verbose_name="昵称", max_length=32, null=True)
    real_name = models.CharField(verbose_name="真实姓名", max_length=32, null=True)
    date_of_birth = models.DateField(verbose_name="出生日期", null=True)
    is_active = models.BooleanField(verbose_name="账户可用", default=True)
    is_admin = models.BooleanField(verbose_name="管理员", default=False)
    joined = models.DateTimeField(verbose_name="加入时间", auto_now_add=True)

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
