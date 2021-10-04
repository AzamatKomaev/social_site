from datetime import datetime

from .models import Token


class CronTask:
    def __init__(self, token, time_pub: datetime):
        self.token = token
        self.minutes = time_pub.minute
        self.hours = time_pub.hour
        self.day = time_pub.day
        self.month = time_pub.month

    def create_task(self):
        pass