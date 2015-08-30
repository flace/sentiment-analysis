from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import numpy as np
import os


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
		self.end_headers()

		search_tag = self.path[1:]
		tweets_string = get_tweets(search_tag)

		self.wfile.write(bytes("{\
			\"searchTag\": \"" + search_tag + "\",\
			\"result\": \"" + tweets_string + "\"}",\
			 "utf-8"))



HOST = "localhost"
PORT = int(os.environ.get("PORT", 8822))


my_server = HTTPServer((HOST, PORT), MyHandler)
print(time.asctime(), "Server Starts - %s:%s" % (HOST, PORT))

try:
	my_server.serve_forever()
except KeyboardInterrupt:
	pass

my_server.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (HOST, PORT))
