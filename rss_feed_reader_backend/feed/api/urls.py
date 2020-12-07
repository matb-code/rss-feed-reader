from django.urls import path
from feed.api.views import user_source, user_source_follow, user_source_unfollow, user_article


app_name = 'feed'

urlpatterns = [
	path('source', user_source, name="user_source"),
    path('article', user_article, name="user_article"),
    path('follow/<id>', user_source_follow, name="user_source_follow"),
    path('unfollow/<id>', user_source_unfollow, name="user_source_unfollow"),
]