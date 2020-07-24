from django.contrib import admin
from . import models


class BooksAdmin(admin.ModelAdmin):
    list_display = ('title', 'grade', 'subject')
    search_fields = ('title', 'grade', 'subject', 'chapter')
    list_filter = ('grade',)
    list_per_page = 20


class UserAdmin(admin.ModelAdmin):
    list_display = ('get_full_name', 'email',)


admin.site.register(models.User, UserAdmin)

admin.site.register(models.Books, BooksAdmin)
admin.site.register(models.Author)
admin.site.register(models.Subject)
