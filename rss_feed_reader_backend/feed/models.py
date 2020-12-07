from django.db import models
from live_feed.models import Source, Article
from account.models import Account
from django.utils import timezone

class UserSource(models.Model):
    id = models.AutoField(primary_key=True)
    date_Subscribed = models.DateTimeField(default=timezone.now)
    source = models.ForeignKey(Source,on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    class Meta:
        unique_together = ["account", "source"]

# class UserBookmark(models.Model):
#     id = models.AutoField(primary_key=True)
#     account = models.ForeignKey(Account, on_delete=models.CASCADE)
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)

