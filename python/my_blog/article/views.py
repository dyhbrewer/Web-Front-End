from django.shortcuts import render
from django.http import HttpResponse
from article.models import Article
from datetime import datetime
# Create your views here.
def home(request):
	#return HttpResponse("Hello World,Django")
	post_list = Article.object.all() #获取全部的Article对象
	return render(request,'home.html',{'post_list':post_list})

def detail(request,my_args):
	return HttpResponse("You're looking at my_args %s."%my_args)
	#post = Article.object.all()[int(my_args)]
	#str = ("title = %s,category=%s,date_time=%s,content=%s"
	#	%(post.title,post.category,post.date_time,post.content))
	#return HttpResponse(str)
def test(request):
	return render(request,'tests.html',{'current_time':datetime.now()})