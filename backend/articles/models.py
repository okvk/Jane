from django.db import models
from accounts.models import User


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=256)
    summary = models.CharField(max_length=512, null=True)
    author = models.ForeignKey(
        User,
        verbose_name="author",
        related_name="user",
        on_delete=models.DO_NOTHING,
    )
    content = models.TextField(null=True)
    is_stickied = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    last_modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["is_stickied", "-last_modified"]

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256)
    counts = models.PositiveIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class TagMap(models.Model):
    aid = models.ForeignKey(
        Article,
        verbose_name="article",
        related_name="articles",
        on_delete=models.CASCADE,
    )
    tid = models.ForeignKey(
        Tag, verbose_name="tag", related_name="tags", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("aid", "tid")
