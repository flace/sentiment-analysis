import urllib.request


def main():
	"""
	Main function.
	"""
	test_url = "http://otelnov.github.io/rangen/"
	with urllib.request.urlopen(test_url) as response:
		html = response.read()
	print(test_url, "has", len(html), "characters")
	print("\nfirst 1488 characters:\n", html)

if __name__ == "__main__":
	main()