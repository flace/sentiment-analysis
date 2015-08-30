from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import numpy as np
import os
import json


def get_tweets(search_tag):
	"""
	STUB (no connection to Twitter for a moment)
	Generating a random sequence of N numbers, where N is the length of a query tag.
	"""
	N = len(search_tag)
	scores = np.random.randint(30, size=N)
	return ",".join([str(score) for score in scores])


class MyHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		self.send_response(200)
		self.send_header("Content-type", "application/json")
		self.send_header('Access-Control-Allow-Origin', '*')
		self.end_headers()

		search_tag = self.path[1:]
		tweets_string = get_tweets(search_tag)

		resp = {
		    'error': False,
		    'data': {
				'donut': [
					{
						'key': 'Positive',
						'y': 88
					},
					{
						'key': 'Neutral',
						'y': 10
					},
					{
						'key': 'Negative',
						'y': 2
					}
				],
				'line': [
					{
						'values': [
							{'x': '2015-8-26', 'y': 1},
							{'x': '2015-8-27', 'y': 3},
							{'x': '2015-8-28', 'y': 2},
							{'x': '2015-8-29', 'y': 2},
							{'x': '2015-8-30', 'y': 3}
						],
						'key': 'Worldwide'
					}
				]
			}
		}

		self.wfile.write(bytes(json.dumps(resp), "utf-8"))



HOST = "0.0.0.0"
PORT = int(os.environ.get("PORT", 8822))


my_server = HTTPServer((HOST, PORT), MyHandler)
print(time.asctime(), "Server Starts - %s:%s" % (HOST, PORT))

try:
	my_server.serve_forever()
except KeyboardInterrupt:
	pass

my_server.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (HOST, PORT))
