import re
from emotions_dict import emotions_dict


def display_tweets(tweets):
    for tweet in tweets:
        print("\n" + tweet.to_string())

def analyze_tweets(tweets):
    all_scores = []
    for tweet in tweets: 
        print("\n" + tweet.created_at)
        print(tweet.text)
        words = tweet.text.split(" ")
        #print(words)
        tweet_score = 0
        matched_words = []
        for word in words:
            match = re.match("[a-z]+" ,word.lower())
            if match:
                matched_word = match.group()
                matched_words.append(matched_word)
                if matched_word in emotions_dict:
                    tweet_score += emotions_dict[matched_word] 

        print(matched_words)
        print("score", tweet_score)
        all_scores.append(tweet_score)
        
    return all_scores