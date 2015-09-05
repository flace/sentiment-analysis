import numpy as np
import time
import os
import sys
from sa_twitter_api import get_twitter_api, extract_9days_tweets
from sa_response_generator import generate_response


if __name__ == '__main__':
	args = sys.argv[1:]
	search_tag = args[0]
	#print('\t\tsearch_tag:', search_tag)
	# TODO do not get twitter API at each GET request. Externalize it and pass as a parameter
	api_instance = get_twitter_api()
	tweets_by_day = extract_9days_tweets(api_instance, search_tag)
	response_str = generate_response(tweets_by_day)
	print(response_str)