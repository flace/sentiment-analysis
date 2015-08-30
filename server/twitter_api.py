# Import the necessary methods from "twitter" library
from twitter import Twitter, OAuth#, TwitterHTTPError, TwitterStream
import re

class Tweet:
    """
    Class that defines a simplified representation of a tweet with following parameters:
    	created_at: when a tweet was created
    	screen_name: screen name of the tweet's author
    	text: tweet's body text
    """
    def __init__(self, screen_name, created_at, text):
        self.screen_name = screen_name
        self.created_at = created_at
        self.text = text
        
    def to_string(self):
        return "author: {0}, created_at: {1}, text: {2}".format(self.screen_name, self.created_at, self.text)


def get_twitter_api():
	"""
	Get an instance of Twitter API object, 
	using authentification parameters for "sentiment-analysis-hackaton" application
	"""
	consumer_key = "0SbsNhX2UzGkkjkIXsuBSgzMe"
	consumer_secret = "CSVmQdIjV5gefccRaWvplBfmRlr9NFrvxtfXV6sEUQ4z8qKfsR"
	access_token_key = "2933845522-ezw0M1g8rybxRzkho6ZbKq2mhcjtBD4ar009vCT"
	access_token_secret = "p6k0FOSMJv50FSPIKakYGYDyJBVWeeTDuNsa7ZueO30Ex"

	oauth = OAuth(access_token_key, access_token_secret, consumer_key, consumer_secret)
	# Initiate the connection to Twitter REST API
	twitter = Twitter(auth=oauth)
	return twitter


def extract_tweets(api_instance, query, lang="en"):

    response = api_instance.search.tweets(q=query, lang=lang)
    tweets = []
    for item in response["statuses"]:
        screen_name = item["user"]["screen_name"] 
        created_at = item["created_at"]
        text = item["text"]
        tweet = Tweet(screen_name=screen_name, created_at=created_at, text=text)
        tweets.append(tweet)
    return tweets