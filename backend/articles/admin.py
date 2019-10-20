from django.contrib import admin

from .models import Article


class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "ctime")
    readonly_fields = ("id", "ctime")


# unregister the Group model from admin.
admin.site.register(Article, ArticleAdmin)
