from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes


from live_feed.models import Source, Article
from live_feed.api.serializers import sourceSerializer, ArticleSerializer


@api_view(['GET',])
@authentication_classes([])
@permission_classes([])
def get_source(request):
    sources = Source.objects.all()

    serialized_response = sourceSerializer(sources, many=True)
    return Response(serialized_response.data)

@api_view(['GET',])
@authentication_classes([])
@permission_classes([])
def get_article(request):
    articles = Article.objects.all()

    serialized_response = ArticleSerializer(articles, many=True)
    return Response(serialized_response.data)