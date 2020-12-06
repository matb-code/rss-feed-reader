from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from live_feed.models import Source
from live_feed.api.serializers import sourceSerializer


@api_view(['GET',])
def get_source(request):
    sources = Source.objects.all()

    serialized_response = sourceSerializer(sources, many=True)
    return Response(serialized_response.data)