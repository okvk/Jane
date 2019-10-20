import uuid
from django.db import models
from accounts.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver

# Create your models here.


FILE_TYPE_CHOICES = [
    ("IMAGE", "image"),
    ("VIDEO", "video"),
    ("ATTACHMENT", "attachment"),
]


class Resource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    filename = models.CharField(max_length=256)
    filetype = models.CharField(
        max_length=10, choices=FILE_TYPE_CHOICES, default="IMAGE"
    )
    upload = models.FileField(upload_to="resources/%Y/%M")
    owner = models.ForeignKey(
        User,
        verbose_name="owner",
        related_name="resources",
        on_delete=models.CASCADE,
    )
    ctime = models.DateTimeField(verbose_name="created at", auto_now_add=True)

    def __str__(self):
        return self.id


# Delete  file after delete resources
@receiver(post_delete, sender=Resource)
def upload_delete_handler(sender, **kwargs):
    resource = kwargs["instance"]
    storage, path = resource.upload.storage, resource.upload.path
    storage.delete(path)
