from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

from account.models import Account
from live_feed.models import Source, Article
from live_feed.api.serializers import ArticleSerializer
from feed.api.serializers import UserSourceSerializer
from feed.models import UserSource#, UserBookmark

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'


@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def user_article(request):
    user = request.user
    try:
        user_sources = UserSource.objects.filter(account=user)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        user_sources_val = user_sources.values_list('source', flat=True)
        user_articles = Article.objects.filter(source__in = user_sources_val)
        serializer = ArticleSerializer(user_articles, many = True)
        return Response(serializer.data)

@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def user_source(request):
    user = request.user
    try:
        user_sources = UserSource.objects.filter(account=user)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSourceSerializer(user_sources, many = True)
        return Response(serializer.data)


@api_view(['DELETE',])
@permission_classes((IsAuthenticated, ))
def user_source_unfollow(request,id):
    user = request.user
    source = Source(id=id)
    data = {}
    try:
        user_source = UserSource.objects.get(account=user, source=source)
    except ObjectDoesNotExist:
        data['response'] = "Source was not followed"
        return Response(data, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operation = user_source.delete()
        if operation:
            data['response'] = DELETE_SUCCESS
        return Response(data=data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def user_source_follow(request, id):
    user = request.user
    try:
        source = Source.objects.get(id=id)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        user_source = UserSource(account=user,source=source)
        data = {}
        try:
            user_source.save()
            data['response'] = CREATE_SUCCESS
            return Response(data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            data['response'] = "Source is already followed"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
        data['response'] = ERROR
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
