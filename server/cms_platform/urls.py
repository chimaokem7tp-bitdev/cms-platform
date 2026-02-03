"""
URL Configuration for cms_platform project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cms/', include('cms.urls')),
]
