import numpy as np
import time
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from twitter_api import get_twitter_api, extract_tweets
from twitter_analyzer import analyze_tweets
from response_generator import generate_response



class MyHandler(BaseHTTPRequestHandler):
	
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type', 'application/json')
		self.send_header('Access-Control-Allow-Origin', '*')
		self.end_headers()

		search_tag = self.path[1:]

		# TODO do not get twitter API at each GET request. Externalize it and pass as a parameter
		api_instance = get_twitter_api()
		print('search_tag:', search_tag)
		print('0. api_instance:', api_instance)
		tweets = extract_tweets(api_instance, search_tag)
		all_scores = analyze_tweets(tweets)
		response_str = generate_response(all_scores)

		self.wfile.write(bytes(response_str, 'utf-8'))



def start_server():
	HOST = '0.0.0.0'
	PORT = int(os.environ.get('PORT', 8822))
	server = HTTPServer((HOST, PORT), MyHandler)
	print(time.asctime(), 'Server Starts - %s:%s' % (HOST, PORT))
	
	try:
		server.serve_forever()
	except KeyboardInterrupt:
		pass

	server.server_close()
	print(time.asctime(), 'Server Stops - %s:%s' % (HOST, PORT))
	


if __name__ == '__main__':
	start_server()