from django.urls import path
from feed.api.views import user_source, user_source_follow, user_source_unfollow, user_article, user_article_bookmark, user_article_bookmark_add,user_article_bookmark_remove


app_name = 'feed'

urlpatterns = [
	path('source', user_source, name="user_source"),
    path('article', user_article, name="user_article"),
    path('follow/<id>', user_source_follow, name="user_source_follow"),
    path('unfollow/<id>', user_source_unfollow, name="user_source_unfollow"),
    path('follow/<id>/<folder_name>', user_source_follow, name="user_source_follow"),
    path('bookmark', user_article_bookmark, name="user_article_bookmark"),
    path('bookmark/add/<id>', user_article_bookmark_add, name="user_article_bookmark_add"),
    path('bookmark/remove/<id>', user_article_bookmark_remove, name="user_article_unbookmark_remove"),
]