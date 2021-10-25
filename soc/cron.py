from datetime import datetime

from django.conf import settings
import psycopg2



"""
    Удостовертесь, что у ваc запущена cron задача,
    которая должна обновляться желательно каждые 1-3 часа.
"""

try:
    conn = psycopg2.connect(
        dbname="social_site",
        user='azamat',

    )

    cur = conn.cursor()

    """Удаляем пользователей с меткой is_active == False"""
    cur.execute("DELETE FROM auth_user WHERE date_joined < NOW() + interval '-1 day' AND is_active = 0;")
    conn.commit()

    print(f"Non-active users were deleted at {datetime.now()}")

    conn.close()
except Exception as e:
    print(e)
