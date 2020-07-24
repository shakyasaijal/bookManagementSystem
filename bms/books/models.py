from django.db import models
from helper import models as models_helper


class Author(models.Model):
    fullName = models.CharField(max_length=255, null=False, blank=False, unique=True)
    email = models.EmailField(null=False, blank=False, unique=True)

    def __str__(self):
        return self.fullName

    class Meta:
        verbose_name = "Author"
        verbose_name_plural = "Authors"


class Subject(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"


class Books(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    grade = models.IntegerField(choices=models_helper.grades_choice, null=False, blank=False, default=1)
    author = models.ManyToManyField(Author, related_name="author_books", blank=False)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT, null=False, blank=False)
    chapter = models.CharField(max_length=255, null=False, blank=False, unique=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Book"
        verbose_name_plural = "Books"
