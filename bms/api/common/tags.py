from books import models as book_models
from itertools import combinations

def add_tags(request, author):
    response = []
    try:
        # Add title tag

        new_tag = ''
        if not book_models.Tags.objects.filter(tag=request.POST['title'].lower()):
            new_tag = book_models.Tags.objects.create(
                tag=request.POST['title'].lower())
        else:
            new_tag = book_models.Tags.objects.filter(
                tag=request.POST['title'].lower())

        response.append(new_tag)

        splitted = request.POST['title'].split(' ')

        for data in splitted:
            if not book_models.Tags.objects.filter(tag=data.lower()):
                new_tag = book_models.Tags.objects.create(tag=data.lower())
            else:
                new_tag = book_models.Tags.objects.filter(tag=data.lower())
            response.append(new_tag)

        for data in list(combinations(splitted, 2)):
            d = ' '.join(data)
            if not book_models.Tags.objects.filter(tag=d.lower()):
                new_tag = book_models.Tags.objects.create(tag=d.lower())
            else:
                new_tag = book_models.Tags.objects.filter(tag=d.lower())
            response.append(book_models.Tags.objects.get(tag=d.lower()))

        # Add author tag
        for data in author:
            auth = book_models.Author.objects.get(id=data['value'])
            if not book_models.Tags.objects.filter(tag=auth.fullName.lower()):
                book_models.Tags.objects.create(tag=auth.fullName.lower())
            else:
                book_models.Tags.objects.filter(tag=auth.fullName.lower())
            response.append(book_models.Tags.objects.get(
                tag=auth.fullName.lower()))
        return response
    except Exception as e:
        print(e, 'add tags')
        return response
