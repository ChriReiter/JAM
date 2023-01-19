"""jam URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from userapi import views as user_views
from jamapi import views as jam_views

urlpatterns = [
    # Django Admin URLs:
    path('admin/', admin.site.urls),
    # user and authentication apis:
    path('api/', user_views.ApiView.as_view({'get': "list"})),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', user_views.UserViewSet.as_view({"get": "list",
                                                       "post": "create"})),
    path('api/users/<pk>', user_views.UserViewSet.as_view({"get": "retrieve",
                                                           "put": "update",
                                                           "delete": "destroy", })),
    path('api/users/<user_pk>/security', user_views.SecurityViewSet.as_view({"put": "update", "get": "list"})),
    path('api/users/<user_pk>/image', user_views.ImageProfileViewSet.as_view({"get": "retrieve", "post": "create"})),
    path('api/users/<user_pk>/groups', user_views.UserGroupViewSet.as_view({"post": "create", "get": "list"})),
    path('api/users/<user_pk>/groups/<group_pk>',
         user_views.UserGroupViewSet.as_view({"delete": "destroy", "get": "retrieve"})),
    path('api/groups', user_views.GroupViewSet.as_view({'get': "list", "post": "create"})),
    path('api/groups/<group_pk>',
         user_views.GroupViewSet.as_view({'put': "update", "delete": "destroy", "get": "retrieve"})),

    # jam urls

    # students
    path('api/students/', jam_views.StudentViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/students/<student_pk>', jam_views.StudentViewSet.as_view({'get': 'retrieve'})),

    # lecturers
    path('api/lecturers/', jam_views.LecturerViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/lecturers/<lecturer_pk>',
         jam_views.LecturerViewSet.as_view({'delete': 'destroy', 'get': 'retrieve', 'put': 'update'})),

    # degree_programmes
    path('api/degree-programmes/', jam_views.DegreeProgramViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/degree-programmes/<dp_pk>', jam_views.DegreeProgramViewSet.as_view({'get': 'retrieve'})),

    # internships
    path('api/internships/', jam_views.InternshipViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/internships/<internship_pk>', jam_views.InternshipViewSet.as_view({'get': 'retrieve', 'put': 'update'})),

    # vacant_positions
    path('api/vacant-positions/', jam_views.VacantPositionViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/vacant-positions/<vacant_position_pk>',
         jam_views.VacantPositionViewSet.as_view({'get': 'retrieve', 'put': 'update'})),

    # companies
    path('api/companies/', jam_views.CompanyViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/companies/<company_pk>', jam_views.CompanyViewSet.as_view({'get': 'retrieve', 'put': 'update'})),

    path('api/send-mail/', jam_views.EmailViewSet.as_view({'post': 'send_email'})),

    # companyDetails
    path('api/companydetails/', jam_views.CompanyDetailViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/companydetails/<company_pk>',
         jam_views.CompanyDetailViewSet.as_view({'get': 'retrieve', 'put': 'update'})),
    path('api/companydetails/search/',
         jam_views.CompanyDetailViewSet.as_view({'get': 'list'})),
    path('api/companydetails/search/<name>',
         jam_views.CompanyDetailViewSet.as_view({'get': 'search'})),
]

if settings.DEBUG:
    # Adding "static" to the urlpatterns makes all file uploads visible in the admin. 
    # This is OK on development servers (hence, the settings.DEBUG check) but should never 
    # be deployed to production environments as it exposes all uploads to the word. 
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
