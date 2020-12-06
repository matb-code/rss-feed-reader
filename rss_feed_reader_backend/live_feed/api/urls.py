from django.urls import path

from live_feed.api.views import get_source

app_name = "live_feed"

urlpatterns = [
    path('source/',get_source, name="source"),
]
