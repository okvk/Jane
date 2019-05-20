from django.contrib import admin
from django.contrib import messages

from .models import Article, Tag, TagMap


class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created")
    readonly_fields = ("id", "created")


class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "counts", "created")
    ordering = ["counts"]
    actions = ["combine_tags"]
    readonly_fields = ("id", "created")

    def combine_tags(self, request, queryset):
        """
        Combine multiple tags into one
        """
        if len(queryset) <= 1:
            self.message_user(request, "非法操作：请勾选两个或两个以上 tag 实例", level=messages.ERROR)
        else:
            sum_counts = 0
            selected_tag = queryset[0]
            for tag in queryset[1:]:
                TagMap.objects.filter(tid=tag.id).update(tid=selected_tag.id)
                sum_counts += tag.counts
                tag.delete()
            selected_tag.counts += sum_counts
            selected_tag.save()
            self.message_user(request, "成功合并 %d tags" % len(queryset))

    combine_tags.short_description = "合并所选 tags"


class TagMapAdmin(admin.ModelAdmin):
    list_display = ("id", "aid", "tid")
    readonly_fields = ("id",)


# unregister the Group model from admin.
admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(TagMap, TagMapAdmin)
