from django.shortcuts import render
from django.http import HttpResponse
from rango.models import Category
from rango.models import Page
from rango.forms import CategoryForm
from rango.forms import UserForm,UserProfileForm
from django.contrib.auth import authenticate,login,logout
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from datetime import datetime

# Create your views here.
def index(request):
	#return HttpResponse("Rango says hey there world!<br/><a href='/rango/about'>About</a>")
	#context_dict = {'boldmessage':"I am bold font from the context"}
	#return render(request,'rango/index.html',context_dict)
	
	category_list = Category.objects.order_by('-likes')[:5]
	page_list = Page.objects.order_by('-views')[:5]
	context_dict = {'categories':category_list,'page_list':page_list}

	visits = request.session.get('visits')
	if not visits:
		visits = 1
	reset_last_visit_time = False

	last_visit = request.session.get('last_visit')
	if last_visit:
		last_visit_time = datetime.strptime(last_visit[:-7],"%Y-%m-%d %H:%M:%S" )
		if(datetime.now() - last_visit_time).seconds > 0:
			visits = visits + 1
			reset_last_visit_time = True
	else:
		reset_last_visit_time = True
	if reset_last_visit_time:
		request.session['last_visit'] = str(datetime.now())
		request.session['visits'] = visits
	context_dict['visits'] = visits
	response = render(request,'rango/index.html',context_dict)
	return response
	
	'''visits = int(request.COOKIES.get('visits','1'))
	reset_last_visit_time = False
	response = render(request,'rango/index.html',context_dict)
	if 'last_visit' in request.COOKIES:
		last_visit = request.COOKIES['last_visit']
		last_visit_time = datetime.strptime(last_visit[:-7],"%Y-%m-%d %H:%M:%S")
		if (datetime.now()-last_visit_time).seconds > 5:
			visits = visits + 1
			reset_last_visit_time = True
	else:
		reset_last_visit_time = True
		context_dict['visits'] = visits
		response = render(request,'rango/index.html',context_dict)

	if reset_last_visit_time:
		response.set_cookie('last_visit',datetime.now())
		response.set_cookie('visits',visits)


	return response'''

def category(request,category_name_slug):
	context_dict = {}
	try:
		category = Category.objects.get(slug=category_name_slug)
		context_dict['category_name'] = category.name
		pages = Page.objects.filter(category=category)
		context_dict['pages'] = pages
		context_dict['category'] = category

	except Category.DoesNotExist:
		pass
	return render(request,'rango/category.html',context_dict)

def add_category(request):
	if request.method =='POST':
		form = CategoryForm(request.POST)
		if form.is_valid():
			form.save(commit=True)
			return index(request)
		else:
			print form.errors
	else:
		form = CategoryForm()
	return render(request,'rango/add_category.html',{'form':form})

def register(request):
	if request.session.test_cookie_worked():
		print ">>> TEST COOKIE WORKED!"
		request.session.delete_test_cookie()

	registered = False
	if request.method == 'POST':
		user_form = UserForm(data=request.POST)
		profile_form = UserProfileForm(data=request.POST)

		if user_form.is_valid() and profile_form.is_valid():
			user = user_form.save()
			user.set_password(user.password)
			user.save()

			profile = profile_form.save(commit=False)
			profile.user = user 

			if 'picture' in request.FILES:
				profile.picture = request.FILES['picture']
				profile.save()
				registered = True
		else:
			print user_form.errors,profile_form.errors
	else:
		user_form = UserForm()
		profile_form = UserProfileForm()
	return render(request,
			'rango/register.html',
			{'user_form':user_form,'profile_form':profile_form,'registered':registered})

def user_login(request):
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username=username,password=password)
		if user:
			if user.is_active:
				login(request,user)
				return HttpResponseRedirect('http://127.0.0.1:8000')
			else:
				return HttpResponse("Your Rango account is disable")
		else:
			print "Invalid login details:{0},{1}".format(username,password)
			return HttpResponse("Invalid login details supplied")
	else:
		return render(request,'rango/login.html',{})

@login_required
def restricted(request):
	return HttpResponse("Since you're logged in,you can see this text")

@login_required
def user_logout(request):
	logout(request)
	return HttpResponseRedirect('http://127.0.0.1:8000/')