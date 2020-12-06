from rest_framework import serializers
from live_feed.models import Source

class sourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'
    