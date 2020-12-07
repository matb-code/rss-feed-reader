from rest_framework import serializers
from live_feed.api.serializers import sourceSerializer
from feed.models import UserSource#, UserBookmark

class UserSourceSerializer(serializers.ModelSerializer):
    source = serializers.SerializerMethodField('get_source')
    class Meta:
        model = UserSource
        fields = '__all__'
    
    def get_source(self,user_source):
        source = user_source.source
        return sourceSerializer(source).data

# class UserBookmarkSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserBookmark
#         fields = '__all__'
    