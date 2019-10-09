from django.contrib import admin

from .models import Article


class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created")
    readonly_fields = ("id", "created")


# unregister the Group model from admin.
admin.site.register(Article, ArticleAdmin)
