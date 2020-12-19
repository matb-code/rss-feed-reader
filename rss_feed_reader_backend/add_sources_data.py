# Run with proper django context
# ./manage.py shell < add_sources_data.py
from live_feed.models import Source
#"http://www.english.ratopati.com/feed/" # TODO look into it
sources_link = ["https://www.thehimalayantimes.com/feed/",
                "https://english.onlinekhabar.com/feed",
                "https://www.nepalitimes.com/feed/",
                "http://joeroganexp.joerogan.libsynpro.com/rss",
                "https://rss.art19.com/1619",
                "http://rss.art19.com/the-daily",
                "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
                "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
                "https://www.theguardian.com/world/rss",
                "http://thinkcomputers.org/feed/",
                "https://nationalgeographicpartners.com/feed/",
                "http://waitbutwhy.com/feed",
                ]


for link in sources_link:
    Source.add_source(url=link)