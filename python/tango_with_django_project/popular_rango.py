import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','tango_with_django_project.settings')

import django
django.setup()

from rango.models import Category,Page

def populate():
	python_cat = add_cat('Python','168','29')

	add_page(cat=python_cat,
		title="Official Python Tutorial",
		url="http://www.woshipm.com")
	add_page(cat=python_cat,
		title="How to Think like a Computer Scientist",
		url="http://www.google.com")
	add_page(cat=python_cat,
		title="Learn Python in 10 Minutes",
		url="http://www.stackoverflow.com")

	django_cat = add_cat("Django","168","48")

	add_page(cat=django_cat,
		title="Official Django Tutorial",
		url="http://www.qq.com")
	add_page(cat=django_cat,
		title="Django Rocks",
		url="http://www.djangorocks.com")
	add_page(cat=django_cat,
		title="How to Tango with Django",
		url="httP://www.tangowithdjango.com")

	frame_cat = add_cat("Other Frameworks","168","28")

	add_page(cat=frame_cat,
		title="Flask",
		url="http://www.baidu.com")
	add_page(cat=frame_cat,
		title="Bottle",
		url="http://www.google.com")

	for c in Category.objects.all():
		for p in Page.objects.filter(category=c):
			print "-{0}-{1}".format(str(c),str(p))
def add_page(cat,title,url,views=0):
	p = Page.objects.get_or_create(category=cat,title=title,url=url,views=views)[0]
	return p
def add_cat(name,views,likes):
	c = Category.objects.get_or_create(name=name,views=views,likes=likes)[0]

	return c
if __name__ == '__main__':
	print "Starting Rango population script..."
	populate()