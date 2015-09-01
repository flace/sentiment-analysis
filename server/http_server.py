import numpy as np
import time
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from twitter_api import get_twitter_api, extract_9days_tweets
from response_generator import generate_response


class MyHandler(BaseHTTPRequestHandler):
	app_route = '/sentiment/'

	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type', 'application/json')
		self.send_header('Access-Control-Allow-Origin', '*')
		self.end_headers()

		full_path = self.path
		if not full_path.startswith(self.app_route):
			self.wfile.write(bytes('{"error": true, "message": "please use route ' + self.app_route + \
				' in your request"}', 'utf-8'))

		else:
			search_tag = full_path.replace(self.app_route, "")
			print('\t\tsearch_tag:', search_tag)
			# TODO do not get twitter API at each GET request. Externalize it and pass as a parameter
			api_instance = get_twitter_api()
			tweets_by_day = extract_9days_tweets(api_instance, search_tag)
			response_str = generate_response(tweets_by_day)
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
