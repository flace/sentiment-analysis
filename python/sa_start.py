import numpy as np
import time
import os
import sys
import argparse
from sa_twitter_api import get_twitter_api, extract_9days_tweets
from sa_response_generator import generate_response


if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument('--key', type=str)
	parser.add_argument('--secret', type=str)
	parser.add_argument('--tkey', type=str)
	parser.add_argument('--tsecret', type=str)
	parser.add_argument('--query', type=str)
	args = parser.parse_args()

	token_key = args.tkey
	token_secret = args.tsecret
	key = args.key
	secret = args.secret
	query = args.query

	#args = sys.argv[1:]
	#search_tag = args[0]
	#print('\t\tsearch_tag:', search_tag)
	# TODO do not get twitter API at each GET request. Externalize it and pass as a parameter

	api_instance = get_twitter_api(token_key, token_secret, key, secret)
	tweets_by_day = extract_9days_tweets(api_instance, query)
	response_str = generate_response(tweets_by_day)
	print(response_str)
