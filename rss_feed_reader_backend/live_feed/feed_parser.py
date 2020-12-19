import feedparser as fp
import datetime
import pytz

def parser(url):
    return fp.parse(url)

def get_source(parsed):
    feed = parsed["feed"]
    return{
        "title" : feed["title"],
        "subtitle" : feed["subtitle"],
        "link" : feed["link"],
        "logo" : feed["image"]["href"] if "image" in feed else "https://www.flaticon.com/svg/static/icons/svg/2964/2964063.svg",
    }

def get_article(parsed):
    articles = []
    entries = parsed["entries"]
    for entry in entries:
        articles.append({
            "guid"  : entry["id"],
            "title" : entry["title"],
            "link"  : entry["link"] if "link" in entry else parsed["feed"]["link"],
            "published_date" : (datetime.datetime(*entry["published_parsed"][:6]) - datetime.timedelta(hours=5,minutes=45))
                                .replace(tzinfo=pytz.utc),
            "summary"   :   entry["summary"],
        })
    return articles
