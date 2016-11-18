"""tango_with_django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from rango import views,about
from django.conf import settings
from registration.backends.simple.views import RegistrationView

class MyRegistrationView(RegistrationView):
    def get_success_url(self,user):
        return 'http://127.0.0.1:8000/'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$',views.index,name='index'),
    url(r'^rango/about/',about.about,name='about'),
    url(r'^rango/add_category/$',views.add_category,name='add_category'),
    url(r'^rango/category/(?P<category_name_slug>[\w\-]+)/$',views.category,name='category'),
    url(r'^rango/register/$',views.register,name='register'), 
    url(r'^rango/login/$',views.user_login,name='login'),
    url(r'^rango/restricted/$',views.restricted,name='restricted'),
    url(r'^rango/logout/$',views.user_logout,name='logout'),
    url(r'^accounts/register/$',MyRegistrationView.as_view(),name='registration_register'),
    url(r'^accounts/',include('registration.backends.simple.urls')),
]


