from datetime import datetime
import sqlite3


"""
    Удостовертесь, что у ваc запущена cron задача,
    которая должна обновляться желательно каждые 1-3 часа.
"""

try:
    conn = sqlite3.connect("/home/azamat/Рабочий стол/Django/social/db.sqlite3")
    cur = conn.cursor()

    """Удаляем пользователей с меткой is_active == False"""
    cur.execute("DELETE FROM auth_user WHERE date_joined < datetime('now', 'localtime', '-1 day') AND is_active = 0;")
    conn.commit()

    print(f"Non-active users were deleted at {datetime.now()}")

    conn.close()
except Exception as e:
    print(e)
