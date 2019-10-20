from django.db import models

from articles.models import Article


class Tag(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256)
    counts = models.PositiveIntegerField(default=0)
    articles = models.ManyToManyField(
        Article,
        through='TagMap',
        related_name='tags'
    )
    ctime = models.DateTimeField(verbose_name="created at", auto_now_add=True)
    mtime = models.DateTimeField(verbose_name="updated at", auto_now=True)

    def __str__(self):
        return self.name


class TagMap(models.Model):
    aid = models.ForeignKey(
        Article,
        verbose_name="article",
        related_name="tag_maps",
        on_delete=models.CASCADE,
    )
    tid = models.ForeignKey(
        Tag, verbose_name="tag", related_name="tag_maps",
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("aid", "tid")
