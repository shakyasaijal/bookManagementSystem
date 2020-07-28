from rest_framework import routers
from django.urls import include, path, re_path
from api import views as api_views


router = routers.DefaultRouter()
router.register("register", api_views.Register, "register")
router.register("login", api_views.Login, "login"),
router.register("books", api_views.Books, "books"),
router.register("logout", api_views.Logout, "logout")
router.register("search", api_views.Search, "search")


urlpatterns = [
    path('popular-books', api_views.popularBooks, name="popularBooks"),
    path('data-to-add-book', api_views.data_to_add_book, name="data-to-add-book"),
    path('refresh-at', api_views.refresh_access_token, name="refresh-access-token")
]


urlpatterns += router.urls