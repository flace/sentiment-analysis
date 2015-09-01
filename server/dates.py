from datetime import datetime, timedelta


def get_today():
    today = datetime.today()
    return today.strftime('%Y-%m-%d')


def minus_one_day(date):
    today = datetime.strptime(date, '%Y-%m-%d')
    yesterday = today - timedelta(days=1)
    return yesterday.strftime('%Y-%m-%d')
