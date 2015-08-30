def generate_donut_data(scores):
    pos_count = 0
    neg_count = 0
    neutr_count = 0
    for score in scores:
        if score > 0:
            pos_count += 1
        elif score < 0:
            neg_count += 1
        else:
            neutr_count += 1
    return "[\
    {\"key\": \"Positive\", \"y\": " + str(pos_count) + "},\
    {\"key\": \"Neutral\", \"y\": " + str(neutr_count) + "},\
    {\"key\": \"Negative\", \"y\": " + str(neg_count) + "}]"


def generate_line_data(scores):
    return "[{\"key\": \"Worldwide\", \"values\": []}]"


def generate_response(scores):
    donut_data = generate_donut_data(scores)
    line_data = generate_line_data(scores)
    return "{\"error\": false, \"data\": { \"donut\": " + donut_data + ", \"line\": " + line_data + "}}"