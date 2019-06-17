from django.db import models
from accounts.models import User


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=256)
    summary = models.CharField(max_length=512, null=True)
    author = models.ForeignKey(
        User,
        verbose_name="author",
        related_name="articles",
        on_delete=models.DO_NOTHING,
    )
    content = models.TextField(null=True)
    raw = models.TextField(null=True)
    is_sticky = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    last_modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["is_sticky", "-last_modified"]

    def __str__(self):
        return self.title
