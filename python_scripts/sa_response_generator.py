from sa_twitter_analyzer import analyze_tweets
import numpy as np
import json


def generate_donut_data(scores_by_day):
    all_scores = []
    for day in scores_by_day:
        all_scores.extend(scores_by_day[day])
    
    pos_count = 0
    neg_count = 0
    neutr_count = 0
    for score in all_scores:
        if score > 0:
            pos_count += 1
        elif score < 0:
            neg_count += 1
        else:
            neutr_count += 1
    return "[\
    {'key': 'Positive', 'y': " + str(pos_count) + "},\
    {'key': 'Neutral', 'y': " + str(neutr_count) + "},\
    {'key': 'Negative', 'y': " + str(neg_count) + "}]"


def generate_line_data(scores_by_day):
    average_scores_by_day = {}
    for day in scores_by_day:
        scores = scores_by_day[day]
        mean = np.mean(scores)
        average_scores_by_day[day] = np.around(mean, 2)

    values = []
    for day in average_scores_by_day:
        values.append({'x': day, 'y': average_scores_by_day[day]})

    return "{'key': 'Worldwide', 'values': " + json.dumps(values) + "}"


def generate_response(tweets_by_day):
    scores_by_day = {}
    for day in tweets_by_day:
        tweets = tweets_by_day[day]
        day_scores = analyze_tweets(tweets)
        scores_by_day[day] = day_scores
        #print(day, day_scores)
        #print(len(tweets), 'tweets')

    donut_data = generate_donut_data(scores_by_day)
    line_data = generate_line_data(scores_by_day)
    data = {'donut': donut_data, 'line': line_data}
    response = {'error': 'false', 'data': data}
    return json.dumps(response)
