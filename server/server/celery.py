import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

app = Celery('server')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'delete-tokens-every-3-hour': {
        'task': 'user_app.tasks.delete_expired_tokens',
        'schedule': crontab(hour='*/3'),
        'args': ()
    }
}
