
from django.http import HttpResponse
def about(request):
	return HttpResponse("Rango says here is the about page<br/> <a href='http://127.0.0.1:8000/'>Index</a>")