from datetime import datetime
import os

import psycopg2


"""
    Удостовертесь, что у ваc запущена cron задача,
    которая должна обновляться желательно каждые 1-3 часа.
"""

try:
    conn = psycopg2.connect(
        dbname=os.getenv("NAME_DATABASE_POSTGRESQL"),
        user=os.getenv("USER_POSTGRESQL"),
        password=os.getenv("PASSWORD_FROM_POSTGRESQL"),
        host=os.getenv("HOST_POSTGRESQL")
    )

    cur = conn.cursor()

    """Удаляем пользователей с меткой is_active == False"""
    cur.execute("""DELETE FROM auth_user WHERE "date_joined" < NOW() + interval '-1 day' AND "is_active" = '0';""")
    print(f"Non-active users were deleted at {datetime.now()}")
    conn.commit()

    cur.execute("""UPDATE soc_api_tokenwasused SET "how_many_used" = '0';""")
    print("Tokens was successfully updated")
    conn.commit()

    conn.close()
except Exception as e:
    print(e)
