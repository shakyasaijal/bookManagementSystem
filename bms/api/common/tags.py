from books import models as book_models
from itertools import combinations


def add_tags(request, author):
    response = []
    try:
        # Add title tag
        new_tag = ''

        # If title not in DB, then add to DB
        if not book_models.Tags.objects.filter(tag=request.POST['title'].lower()):
            new_tag = book_models.Tags.objects.create(
                tag=request.POST['title'].lower())
            response.append(new_tag)
        else:
            new_tag = book_models.Tags.objects.filter(
                tag=request.POST['title'].lower())
            response.append(new_tag.first())

        splitted = request.POST['title'].split(' ')

        '''
        > splitted: example:
        title = "The Summer Soul"
        splitted = ['The', 'Summer', 'Soul']
        '''
        for data in splitted:
            if not book_models.Tags.objects.filter(tag=data.lower()):
                new_tag = book_models.Tags.objects.create(tag=data.lower())
                response.append(new_tag)
            else:
                new_tag = book_models.Tags.objects.filter(tag=data.lower())
                for d in new_tag:
                    response.append(d)

        '''
        > combination of splitted: example
        > result: (('The', 'Summer'), ('The', 'Soul'), ('Summer', 'Soul'))
        '''
        for data in list(combinations(splitted, 2)):
            d = ' '.join(data)
            if not book_models.Tags.objects.filter(tag=d.lower()):
                new_tag = book_models.Tags.objects.create(tag=d.lower())
                response.append(book_models.Tags.objects.get(tag=d.lower()))
            else:
                new_tag = book_models.Tags.objects.filter(tag=d.lower())
                for d in new_tag:
                    response.append(d)


        # Add author tag
        for data in author:
            auth = book_models.Author.objects.get(id=data['value'])
            if not book_models.Tags.objects.filter(tag=auth.fullName.lower()):
                book_models.Tags.objects.create(tag=auth.fullName.lower())
                response.append(book_models.Tags.objects.get(tag=auth.fullName.lower()))
            else:
                tag = book_models.Tags.objects.filter(tag=auth.fullName.lower())
                for d in tag:
                    response.append(d)
                
        for data in response:
            print(data, type(data))
        return response
    except Exception as e:
        print(e, 'add tags')
        return response
