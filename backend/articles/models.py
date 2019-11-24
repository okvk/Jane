from django.db import models
from accounts.models import User


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
    ctime = models.DateTimeField(verbose_name="posted at", auto_now_add=True)
    mtime = models.DateTimeField(verbose_name="updated at", auto_now=True)

    class Meta:
        ordering = ["is_sticky", "-mtime"]

    def __str__(self):
        return self.title
