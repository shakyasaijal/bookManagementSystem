from django.contrib import admin
from . import models


class BooksAdmin(admin.ModelAdmin):
    list_display = ('title', 'grade', 'subject')
    search_fields = ('title', 'grade', 'subject', 'chapter')
    list_filter = ('grade',)
    list_per_page = 20
    readonly_fields = ['image_tag']


class UserAdmin(admin.ModelAdmin):
    list_display = ('get_full_name', 'email',)

    def save_model(self, request, obj, form, change):
        if 'password' in form.changed_data:
            obj.set_password(request.POST['password'])
        obj.save()


admin.site.register(models.User, UserAdmin)

admin.site.register(models.Books, BooksAdmin)
admin.site.register(models.Author)
admin.site.register(models.Subject)
