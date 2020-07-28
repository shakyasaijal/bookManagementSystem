from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import parsers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, logout
import jwt
import yaml
from django.template.loader import render_to_string
from rest_framework.decorators import permission_classes, api_view

from books import models as books_model
from . import serializers
from helper import controller
from api.common import send_email, tags
from django.db.models import Q
from helper import models as models_helper
from api.common import controller as search_controller
from api import middleware

credentials = yaml.load(open("credentials.yaml"), Loader=yaml.FullLoader)


class Register(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = books_model.User.objects.all()
    serializer_class = serializers.UserRegisterSerializer
    permission_classes = [AllowAny, ]

    def create(self, request):
        try:
            serializer = serializers.UserRegisterSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                try:
                    # Add refresh token
                    user = books_model.User.objects.get(
                        email=request.data["email"])
                    refresh_token = user.refresh_token
                    user.refresh_tokens = refresh_token
                    user.save()
                except (Exception, books_model.User.DoesNotExist) as e:
                    pass

                # Response data
                data = {
                    'id': user.id,
                    'email': user.email,
                    'fullName': user.get_full_name(),
                    "accessToken": user.access_token,
                    "refreshToken": refresh_token
                }
                return Response({"status": True, "data": data}, status=200)
            else:
                return Response({"status": False, "data": {"message": "Sign up Failed."}}, status=401)
        except Exception as e:
            print(e)


class Login(mixins.CreateModelMixin,
            viewsets.GenericViewSet):
    serializer_class = serializers.LoginSerializer
    permission_classes = [AllowAny, ]

    @csrf_exempt
    def create(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data["email"]
            password = request.data["password"]
            try:
                # Check if user exists
                check = books_model.User.objects.get(email=email)
                user = authenticate(
                    request, email=request.data["email"], password=request.data["password"])
            except books_model.User.DoesNotExist:
                return Response({"status": False, "data": {"message": "Invalid credentials."}}, status=201)

            '''
            # If refresh token exists append with ','
            # OR
            # Add new refresh token
            '''
            if user:
                token = user.refresh_token
                if user.refresh_tokens:
                    refresh_tokens = user.refresh_tokens + "," + token
                else:
                    refresh_tokens = token
                user.refresh_tokens = refresh_tokens
                user.save()
                data = {
                    "id": user.id,
                    "email": user.email,
                    "fullName": user.get_full_name(),
                    "accessToken": user.access_token,
                    "refreshToken": token
                }
                return Response({"status": True, "data": data}, status=200)
            else:
                return Response({"status": False, "data": {"message": "Invalid credentials"}}, status=400)
        else:
            return Response({"status": False, "data": {"message": "Invalid credentials"}}, status=400)


class Books(viewsets.ModelViewSet):
    queryset = books_model.Books.objects.all()
    serializer_class = serializers.BooksSerializer
    permission_classes = [AllowAny, ]

    def list(self, request):
        # Fetch data randomly
        all_books = books_model.Books.objects.all().order_by('?')[:10]
        books = []
        for book in all_books:
            books.append({
                'id': book.id,
                'title': book.title,
                'author': [i.fullName for i in book.author.all()],
                'image': book.image.url
            })
        return Response({"status": True, "data": books}, status=200)

    def retrieve(self, request, pk):
        try:
            book = books_model.Books.objects.get(pk=pk)
            book.views += 1
            book.save()

            all_subject = books_model.Subject.objects.all()
            all_author = books_model.Author.objects.all()
            subject = []
            author = []
            for data in all_subject:
                subject.append({
                    "value": data.id,
                    "label": data.name
                })

            for data in all_author:
                author.append({
                    "value": data.id,
                    "label": data.fullName
                })
            all_grade = dict(models_helper.grades_choice)

            data = {
                "id": book.id,
                "title": book.title,
                "grade": book.grade,
                "gradeObj": {"value": book.grade, "label": all_grade[book.grade]},
                "author": [i.fullName for i in book.author.all()],
                "authorObj": [{"value": i.id, "label": i.fullName} for i in book.author.all()],
                "subject": book.subject.name,
                "subjectObj": {"value": book.subject.id, "label": book.subject.name},
                "chapter": book.chapter,
                "postedBy": book.user.get_full_name(),
                'userId': book.user.id,
                "image": book.image.url,
                "views": book.views,
                "description": book.description,
                "subjects": subject,
                "authors": author
            }
            return Response({"status": True, "data": data}, status=200)
        except (Exception, books_model.Books.DoesNotExist) as e:
            print(e)
            return Response({"status": False, "data": {"message": "Data not found"}}, status=401)

    def update(self, request, pk):
        try:
            """
            # Get email from access token.
            """
            email = controller.get_email(request)
        except Exception as e:
            return Response({"status": False, "data": {"message": "Access Token required"}}, status=401)

        try:
            author = None
            try:
                author = eval(request.data['author'])
            except Exception as e:
                pass

            subject = eval(request.data['subject'])

            image = None
            update__ = books_model.Books.objects.none()
            try:
                if request.FILES['image']:
                    update_book = books_model.Books.objects.filter(pk=pk).update(title=request.data['title'], subject=books_model.Subject.objects.get(id=subject['value']), grade=request.data['grade'], chapter=request.data['chapter'],
                                                                                 description=request.data['description'])
                    update__ = books_model.Books.objects.get(pk=pk)
                    update__.image = request.FILES['image']
                    update__.save()
            except Exception as e:
                update_book = books_model.Books.objects.filter(pk=pk).update(title=request.data['title'], subject=books_model.Subject.objects.get(id=subject['value']), grade=request.data['grade'], chapter=request.data['chapter'],
                                                                             description=request.data['description'])

            new_tags = tags.add_tags(request, author)
            try:
                update__ = books_model.Books.objects.get(pk=pk)
                update__.tags.clear()
                for data in new_tags:
                    update__.tags.add(data)
            except Exception as e:
                pass

            book = books_model.Books.objects.get(pk=pk)
            if email != book.user.email:
                return Response({"status": False, "data": {"message": "You don't have authority to update this book."}}, status=401)

            book.author.clear()
            if author:
                for data in author:
                    book.author.add(
                        books_model.Author.objects.get(id=data['value']))

            message = render_to_string('api/update-email.html', {
                'byUser': book.user.get_full_name(),
                'title': request.data['title']
            })

            # Get author email
            author_email = [data.email for data in book.author.all()]

            # Send email
            if send_email.send_new_email(author_email, message, "Book has been updated."):
                return Response({"status": True, "data": 'Updated'}, status=200)
            else:
                return Response({"status": False, "data": {"message": "Sorry. Email could not be send."}}, status=401)
        except (Exception, books_model.Books.DoesNotExist) as e:
            print(e)
            return Response({"status": False, "data": {"message": "Data not found."}}, status=401)

    def create(self, request):
        try:
            """
            # Get email from access token.
            """
            email = controller.get_email(request)
        except Exception as e:
            return Response({"status": False, "data": {"message": "Access Token required"}}, status=401)

        try:
            author = eval(request.data['author'])
            subject = eval(request.data['subject'])

            new_book = books_model.Books.objects.create(title=request.data['title'], subject=books_model.Subject.objects.get(id=subject['value']), grade=request.data['grade'], chapter=request.data['chapter'],
                                                        image=request.FILES['image'], description=request.data['description'])

            # Add user to books model.
            new_book.user = books_model.User.objects.get(email=email)
            new_book.save()
            for data in author:
                new_book.author.add(
                    books_model.Author.objects.get(id=data['value']))

            # Add tags to the book object for search.
            new_tags = tags.add_tags(request, author)
            try:
                for data in new_tags:
                    new_book.tags.add(data)
            except Exception as e:
                pass

            new_book.save()
            message = render_to_string('api/create-email.html', {
                'byUser': new_book.user.get_full_name(),
                'title': new_book.title
            })

            # Get author email
            author_email = [data.email for data in new_book.author.all()]

            if send_email.send_new_email(author_email, message, "Book has been created."):
                return Response({"status": True, "data": "Book successfully created."}, status=200)
            else:
                new_book.delete()
                return Response({"status": False, "data": {"message": "Sorry. Email could not be send."}}, status=201)
        except (Exception, books_model.User.DoesNotExist) as e:
            print("Create book: ", e)
            return Response({"status": False, "data": {"message": "Something went wrong."}}, status=400)

    def destroy(self, request, pk):
        try:
            """
            # Get email from access token.
            """
            email = controller.get_email(request)
        except Exception as e:
            return Response({"status": False, "data": {"message": "Access Token required"}}, status=401)

        try:
            book = books_model.Books.objects.get(pk=pk)
            if book.user.email != email:
                return Response({"status": False, "data": {"message": "You don't have authority to delete this book."}}, status=401)

            book.delete()
            return Response({"status": True, "data": {"message": "Book deleted"}}, status=200)
        except (Exception, books_model.Books.DoesNotExist) as e:
            print("Delete book: ", e)
            return Response({"status": False, "data": {"message": "Something went wrong."}}, status=400)


class Logout(mixins.CreateModelMixin,
             viewsets.GenericViewSet):
    serializer_class = serializers.Logout
    permission_classes = [AllowAny, ]

    def create(self, request):
        try:
            print(request.data)
            decoded = jwt.decode(request.data['accessToken'], credentials["jwt_secret"], algorithms="HS256", options={
                "verify_exp": False})
            user = books_model.User.objects.get(email=decoded["email"])
        except (books_model.User.DoesNotExist, Exception) as e:
            print(e)
            return Response({"status": False, "data": {"message": "Invalid Token"}}, status=400)

        try:
            serializer = serializers.Logout(data=request.data)
            if serializer.is_valid():
                refresh_tokens = user.refresh_tokens.split(",")
                
                if serializer.data.get("refreshToken") in refresh_tokens:
                    refresh_tokens.remove(serializer.data.get("refreshToken"))
                    if len(refresh_tokens) > 0:
                        user.refresh_tokens = ",".join(refresh_tokens)
                    else:
                        user.refresh_tokens = None
                    user.save()
                    return Response({"status": True, "data": {"message": "Successfully logged out"}}, status=200)
                return Response({"status": False, "data": {"message": "Invalid Refresh Token"}}, status=400)

            return Response({"status": False, "data": {"message": serializer.errors}}, status=400)
        except Exception as e:
            print(e)


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def popularBooks(request):
    try:
        all_books = books_model.Books.objects.order_by("-views")[:10]

        response = []

        for data in all_books:
            response.append({
                "id": data.id,
                "title": data.title,
                "author": [i.fullName for i in data.author.all()],
                "image": data.image.url
            })
        return Response({"status": True, "data": response}, status=200)
    except Exception as e:
        print(e)
        return Response({"status": False, "data": {"message": "Something went wrong."}}, status=400)


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def data_to_add_book(request):
    try:
        all_subject = books_model.Subject.objects.all()
        all_author = books_model.Author.objects.all()
        subject = []
        author = []
        for data in all_subject:
            subject.append({
                "value": data.id,
                "label": data.name
            })

        for data in all_author:
            author.append({
                "value": data.id,
                "label": data.fullName
            })

        data = {
            "allSubjects": subject,
            "allAuthor": author
        }

        return Response({"status": True, "data": data}, status=200)
    except Exception as e:
        return Response({"status": False, "data": {"message": "Something went wrong."}})



@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def refresh_access_token(request):
    try:
        refreshToken = request.data['refreshToken']
    except Exception as e:
        return Response({"status": False, "data": {"message": "Refresh token required."}}, status=201)

    try:
        refresh = middleware.refresh_access_token(refreshToken)
        print(refresh)
        return Response({"status": True, "data": refresh}, status=200)
    except Exception as e:
        return Response({"status": False, "data": {"message": "Something went wrong."}})
        


class Search(mixins.CreateModelMixin,
             viewsets.GenericViewSet):

    serializer_class = serializers.SearchSerializer
    permission_classes = [AllowAny, ]

    def create(self, request):
        subjectFilter = []
        chapterFilter = []
        gradeFilter = []

        # If subject selected, then filter from it
        # otherwise
        # get all subjects
        try:
            subjectFilter = request.data['filters']['subjects']
            if not subjectFilter:
                subjectFilter = search_controller.get_unique_subjects()
        except Exception as e:
            subjectFilter = search_controller.get_unique_subjects()

        # If chapter selected, then filter from it
        # otherwise
        # get all chapter
        try:
            chapterFilter = request.data['filters']['chapters']
            if not chapterFilter:
                chapterFilter = search_controller.get_unique_chapters()
        except Exception as e:
            chapterFilter = search_controller.get_unique_chapters()

        # If grade selected, then filter from it
        # otherwise
        # get all grade
        try:
            gradeFilter = request.data['filters']['grades']
            if not gradeFilter:
                gradeFilter = search_controller.get_unique_grades()
        except Exception as e:
            gradeFilter = search_controller.get_unique_grades()

        books = books_model.Books.objects.filter(
            Q(tags__tag__icontains=request.data['search']) & Q(subject__id__in=subjectFilter) & Q(chapter__in=chapterFilter) & Q(grade__in=gradeFilter)).distinct()

        '''
        > data: search result
        > chapters, subjects, grades for filter
        '''
        data = []
        chapters = []
        subjects = []
        grades = []

        for book in books:
            data.append({
                "title": book.title,
                "image": book.image.url,
                "id": book.id
            })

            all_grade = dict(models_helper.grades_choice)
            chapters.append(book.chapter)

            # Check for uniqueness
            if {"name": all_grade[book.grade], "id": book.grade} not in grades:
                grades.append(
                    {"name": all_grade[book.grade], "id": book.grade})

            # Check for uniqueness
            if {"name": book.subject.name, "id": book.subject.id} not in subjects:
                subjects.append(
                    {"name": book.subject.name, "id": book.subject.id})

        response = {
            "data": data,
            "chapters": list(dict.fromkeys(chapters)),
            "subjects": subjects,
            'grades': grades
        }
        return Response({'status': True, 'data': response}, status=200)
