from rest_framework import serializers
from live_feed.api.serializers import sourceSerializer
from live_feed.models import Article
from feed.models import UserSource, UserBookmark

class UserSourceSerializer(serializers.ModelSerializer):
    source = serializers.SerializerMethodField('get_source')
    class Meta:
        model = UserSource
        fields = '__all__'
    
    def get_source(self,user_source):
        source = user_source.source
        return sourceSerializer(source).data


class UserArticleSerializer(serializers.ModelSerializer):
    source = serializers.SerializerMethodField('get_source_info')
    class Meta:
        model = Article
        fields = '__all__'
    
    def get_source_info(self,article):
        source = article.source
        return {"source_id": source.id,
                "source_name": source.title, 
                "source_link": source.link,
                "source_logo": source.logo_link}

class UserBookmarkSerializer(serializers.ModelSerializer):
    article = serializers.SerializerMethodField('get_article')
    class Meta:
        model = UserBookmark
        fields = "__all__"

    def get_article(self,user_bookmark):
        article = user_bookmark.article
        return UserArticleSerializer(article).data
    