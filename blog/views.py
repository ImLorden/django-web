from django.shortcuts import render, get_object_or_404
from django.db import OperationalError
from .models import Post

def home(request):
    try:
        posts = Post.objects.filter(is_published=True).order_by('-created_at')
        return render(request, 'blog/home.html', {'posts': posts})
    except OperationalError:
        # Handle the case where the table doesn't exist yet
        return render(request, 'blog/home.html', {'posts': [], 'setup_required': True})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})

def about(request):
    return render(request, 'about.html') 
