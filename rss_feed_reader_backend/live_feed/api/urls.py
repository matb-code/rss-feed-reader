from django.urls import path

from live_feed.api.views import get_source, get_article

app_name = "live_feed"

urlpatterns = [
    path('source/',get_source, name="source"),
    path('article/',get_article, name="article"),
]