from datetime import datetime
import sqlite3


print(f"cron was started at {datetime.now()}")

"""Удостовертесь, что у ваc запущена cron задача, которая должна обновляться желательно каждые 1-3 часа."""

try:
    conn = sqlite3.connect("/home/azamat/Рабочий стол/Django/social/db.sqlite3") #Важно! Вставляем относительный путь до базы данных
    cur = conn.cursor()

    """Удаляем пользователей с меткой is_active == False"""
    cur.execute("DELETE FROM auth_user WHERE date_joined < datetime('now', 'localtime', '-1 day') AND is_active = 0;")
    print("Execute command")
    conn.commit()
    print("Commit command")

    conn.close()
    print("close connect")
except Exception as e:
    print(e)
