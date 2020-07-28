from books import models as book_models
from helper import models as helper_models


def get_unique_subjects():
    response = []
    for data in book_models.Subject.objects.all():
        response.append(data.id)

    return response


def get_unique_chapters():
    response = []
    for data in book_models.Books.objects.all():
        if data.chapter not in response:
            response.append(data.chapter)

    return response


def get_unique_grades():
    grades = helper_models.grades_choice
    response = []
    for data in dict(grades):
        response.append(data)

    return response
    