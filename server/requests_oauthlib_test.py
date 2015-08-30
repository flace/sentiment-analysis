from requests_oauthlib import OAuth1    

client_key = ''
client_secret = ''
resource_owner_key = ''
resource_owner_secret = ''

def query(queryurl):
	headeroauth = OAuth1(client_key, client_secret, resource_owner_key,
	resource_owner_secret, signature_type = 'auth_header')

	return requests.get(queryurl, auth = headeroauth)

query('http://google.com')