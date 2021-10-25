from datetime import datetime

from django.conf import settings
import psycopg2

from db_access import *


"""
    Удостовертесь, что у ваc запущена cron задача,
    которая должна обновляться желательно каждые 1-3 часа.
"""

try:
    conn = psycopg2.connect(
        dbname=db_name,
        user=user,
        password=password,
        host=host
    )

    cur = conn.cursor()

    """Удаляем пользователей с меткой is_active == False"""
    cur.execute("DELETE FROM auth_user WHERE date_joined < NOW() + interval '-1 day' AND is_active = 0;")
    print(f"Non-active users were deleted at {datetime.now()}")
    conn.commit()

    cur.execute("UPDATE soc_api_tokenwasused SET was_used = 0;")
    print("Tokens was successfully updated")
    conn.commit()

    conn.close()
except Exception as e:
    print(e)
